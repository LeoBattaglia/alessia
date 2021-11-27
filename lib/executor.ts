//Imports
import * as builder from "./builder";
import * as config from "./res/config.json";
import {DB, MySQL_Select} from "dilara";
const milena = require("milena");
const p = new milena.Prompt();
import {Session, sessions} from "./session"
import * as sys from "samara"

//Classes
export class Executor{
    //Declarations
    private db:DB;
    private websocket;

    //Constructor
    constructor(websocket, database:DB){
        this.db = database;
        this.websocket = websocket;
    }

    //Methods
    private checkSessionIDExists(sid:string):Boolean{
        return sessions.exists(sid);
    }

    execute(jsonObject:string, req):void{
        sessions.removeOldSessions();
        let ip:string = req.socket.remoteAddress;
        while(ip.indexOf(":") > -1){
            ip = ip.substring(1, ip.length);
        }
        let data = JSON.parse(jsonObject);
        data["ip"] = ip;
        //console.log("EXECUTE: " + data.command);
        if(data.command === "getSID"){
            this.sendNewSID();
        }else if(data.command === "checkSID"){
            if(!this.checkSessionIDExists(data.sid)){
                this.sendNewSID();
            }else{
                this.loginBySID(data.sid);
            }
        }else{
            if(this.checkSessionIDExists(data.sid)){
                switch(data.command){
                    case "login":
                        this.login(data).then();
                        break;
                }
            }
        }
    }

    private async login(data){
        if(this.validateString(data.username, false) && this.validateString(data.password, true)){
            let session:Session = sessions.get(data.sid);
            //console.log("Tries: " + session.getTries());
            if(session.getTries() < config.loginTries){
                //console.log("LOGIN: " + data.username + "/" + data.password + "/" + data.sid + "/" + data.ip);
                let query:MySQL_Select = this.db.getEmptySelectQuery("user", "*");
                query.addWhere("active=1");
                let values = await this.db.select(query);
                for(let i = 0; i < values["length"]; i++){
                    //console.log("FFF: " + values[i].username + "/" + values[i].password + "/" + values[i].admin);
                    if(data.username === values[i].username){
                        if(data.password === values[i].password){
                            if(values[i].admin === 1){
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
            }else{
                //console.log("FVC")
                this.sendError("Tried too often to login");
            }
        }else{
            this.sendError("Username or password contains illegal characters");
        }
    }

    private loginBySID(sid:string):void{
        //console.log("loginBySID");
        let session:Session = sessions.get(sid);
        if(session.isAdmin()){
            let data = {
                command: "setAdminPanel",
                content: builder.buildAdminPanel().getHTML()
            };
            this.websocket.send(JSON.stringify(data));
        }else{
            let data = {
                command: "setAdminPanel",
                content: builder.buildAdminPanelLogin().getHTML()
            };
            this.websocket.send(JSON.stringify(data));
        }

    }

    static printSessions():void{
        p.printLine();
        p.printColorYellow("Sessions:");
        for(let session of sessions.getSessions()){
            p.print("SID: " + session.getSID());
        }
    }

    private sendAlert(alert:string):void{
        let data = {
            command: "alert",
            content: alert
        };
        this.websocket.send(JSON.stringify(data));
    }

    private sendError(error:string):void{
        this.sendAlert("ERROR: " + error + "!")
    }

    private sendNewSID():void{
        let sid:string = sys.getUUID();
        sessions.add(sid);
        let data = {
            command: "setSID",
            sid: sid
        };
        this.websocket.send(JSON.stringify(data));
    }

    private validateCharacter(char:string, password:Boolean):Boolean{
        let chars:string[];
        if(password){
            chars = sys.chars_password;
        }else{
            chars = sys.chars;
        }
        if(chars.includes(char)){
            return true;
        }else{
            return false;
        }
    }

    private validateString(str:string, password:Boolean):Boolean{
        let array:string[] = str.split("");
        for(let char of array){
            if(!this.validateCharacter(char, password)){
                return false;
            }
        }
        return true;
    }
}