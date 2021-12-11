"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
//Imports
const config = require("./res/config.json");
const lorena_1 = require("lorena");
const func = require("./functions");
const funcHTML = require("./html_functions");
const session_1 = require("./session");
//Constants
const encryptor = new lorena_1.Encryptor();
//Classes
class Executor {
    //Constructor
    constructor(websocket, database) {
        this.db = database;
        this.websocket = websocket;
    }
    //Methods
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
            if (!func.checkSessionIDExists(data.sid)) {
                this.sendNewSID();
            }
            else {
                this.loginBySID(data.sid);
            }
        }
        else {
            if (func.checkSessionIDExists(data.sid)) {
                session_1.sessions.get(data.sid).setTimestamp();
                switch (data.command) {
                    case "loadPage":
                        this.loadPage(data);
                        break;
                    case "loadPanel":
                        this.loadPanel(data);
                        break;
                    case "login":
                        this.login(data).then();
                        break;
                    case "logout":
                        this.logout();
                        break;
                }
            }
        }
    }
    loadPage(data) {
        console.log("LOAD PAGE: " + data.page);
        //TODO: All
    }
    loadPanel(data) {
        console.log("LOAD PANEL: " + data.panel);
        if (func.isAdmin(data.sid)) {
            //TODO: All
        }
    }
    async login(data) {
        if (func.validateUsernameAndPassword(data.username, data.password)) {
            let session = session_1.sessions.get(data.sid);
            if (session.getTries() < config.loginTries) {
                let values = await this.db.select(func.getQueryUsernameAndPassword(this.db, data.username, data.password));
                if (values["length"] === 1) {
                    if (values[0].admin === 1) {
                        session.setAdmin(true);
                    }
                    let data2 = {
                        command: "setAdminPanel",
                        content: funcHTML.loadWidget("alessia_adminpanel").getHTML()
                    };
                    this.websocket.send(JSON.stringify(data2));
                }
                else {
                    session.addTry();
                    this.sendError("Username or password not found");
                }
            }
            else {
                this.sendError("Tried too often to login");
            }
        }
        else {
            this.sendError("Username and/or password contains illegal characters");
        }
    }
    loginBySID(sid) {
        if (config.developer_mode) {
            let session = session_1.sessions.get(sid);
            //session.setTimestamp();
            let data;
            if (session.isAdmin()) {
                data = {
                    command: "setAdminPanel",
                    content: funcHTML.loadWidget("alessia_adminpanel").getHTML()
                };
            }
            else {
                data = {
                    command: "setAdminPanel",
                    content: funcHTML.loadWidget("alessia_adminpanel_login").getHTML()
                };
            }
            this.websocket.send(JSON.stringify(data));
        }
    }
    logout() {
        console.log("LOGOUT");
        //TODO: All
        this.sendAlert("Logged out.");
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
        let sid = encryptor.getUID(8, 8);
        session_1.sessions.add(sid);
        let data = {
            command: "setSID",
            sid: sid
        };
        this.websocket.send(JSON.stringify(data));
    }
}
exports.Executor = Executor;
//# sourceMappingURL=executor.js.map