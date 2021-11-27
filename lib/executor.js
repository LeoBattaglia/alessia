"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
//Imports
const builder = require("./builder");
const config = require("./res/config.json");
const milena = require("milena");
const p = new milena.Prompt();
const session_1 = require("./session");
const sys = require("samara");
//Classes
class Executor {
    //Constructor
    constructor(websocket, database) {
        this.db = database;
        this.websocket = websocket;
    }
    //Methods
    checkSessionIDExists(sid) {
        return session_1.sessions.exists(sid);
    }
    execute(jsonObject, req) {
        session_1.sessions.removeOldSessions();
        let ip = req.socket.remoteAddress;
        while (ip.indexOf(":") > -1) {
            ip = ip.substring(1, ip.length);
        }
        let data = JSON.parse(jsonObject);
        data["ip"] = ip;
        //console.log("EXECUTE: " + data.command);
        if (data.command === "getSID") {
            this.sendNewSID();
        }
        else if (data.command === "checkSID") {
            if (!this.checkSessionIDExists(data.sid)) {
                this.sendNewSID();
            }
            else {
                this.loginBySID(data.sid);
            }
        }
        else {
            if (this.checkSessionIDExists(data.sid)) {
                switch (data.command) {
                    case "login":
                        this.login(data).then();
                        break;
                }
            }
        }
    }
    async login(data) {
        if (this.validateString(data.username, false) && this.validateString(data.password, true)) {
            let session = session_1.sessions.get(data.sid);
            //console.log("Tries: " + session.getTries());
            if (session.getTries() < config.loginTries) {
                //console.log("LOGIN: " + data.username + "/" + data.password + "/" + data.sid + "/" + data.ip);
                let query = this.db.getEmptySelectQuery("user", "*");
                query.addWhere("active=1");
                let values = await this.db.select(query);
                for (let i = 0; i < values["length"]; i++) {
                    //console.log("FFF: " + values[i].username + "/" + values[i].password + "/" + values[i].admin);
                    if (data.username === values[i].username) {
                        if (data.password === values[i].password) {
                            if (values[i].admin === 1) {
                                //console.log("setAdmin")
                                session.setAdmin(true);
                            }
                            let data2 = {
                                command: "setAdminPanel",
                                content: builder.buildAdminPanel().getHTML()
                            };
                            this.websocket.send(JSON.stringify(data2));
                            return;
                        }
                    }
                }
                session.addTry();
                this.sendError("Username or password not found");
            }
            else {
                //console.log("FVC")
                this.sendError("Tried too often to login");
            }
        }
        else {
            this.sendError("Username or password contains illegal characters");
        }
    }
    loginBySID(sid) {
        //console.log("loginBySID");
        let session = session_1.sessions.get(sid);
        if (session.isAdmin()) {
            let data = {
                command: "setAdminPanel",
                content: builder.buildAdminPanel().getHTML()
            };
            this.websocket.send(JSON.stringify(data));
        }
        else {
            let data = {
                command: "setAdminPanel",
                content: builder.buildAdminPanelLogin().getHTML()
            };
            this.websocket.send(JSON.stringify(data));
        }
    }
    static printSessions() {
        p.printLine();
        p.printColorYellow("Sessions:");
        for (let session of session_1.sessions.getSessions()) {
            p.print("SID: " + session.getSID());
        }
    }
    sendAlert(alert) {
        let data = {
            command: "alert",
            content: alert
        };
        this.websocket.send(JSON.stringify(data));
    }
    sendError(error) {
        this.sendAlert("ERROR: " + error + "!");
    }
    sendNewSID() {
        let sid = sys.getUUID();
        session_1.sessions.add(sid);
        let data = {
            command: "setSID",
            sid: sid
        };
        this.websocket.send(JSON.stringify(data));
    }
    validateCharacter(char, password) {
        let chars;
        if (password) {
            chars = sys.chars_password;
        }
        else {
            chars = sys.chars;
        }
        if (chars.includes(char)) {
            return true;
        }
        else {
            return false;
        }
    }
    validateString(str, password) {
        let array = str.split("");
        for (let char of array) {
            if (!this.validateCharacter(char, password)) {
                return false;
            }
        }
        return true;
    }
}
exports.Executor = Executor;
//# sourceMappingURL=executor.js.map