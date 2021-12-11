//Imports
import * as config from "./res/config.json";
import {DB, MySQL_Select} from "dilara";
import {Encryptor} from "lorena";
import * as func from "./functions";
import * as funcHTML from "./html_functions";
import {Session, sessions} from "./session";
import * as sys from "samara";

//Constants
const encryptor:Encryptor = new Encryptor();

//Classes
export class Executor{
    //Declarations
    private readonly db:DB;
    private websocket;

    //Constructor
    constructor(websocket, database:DB){
        this.db = database;
        this.websocket = websocket;
    }

    //Methods
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
            if(!func.checkSessionIDExists(data.sid)){
                this.sendNewSID();
            }else{
                this.loginBySID(data.sid);
            }
        }else{
            if(func.checkSessionIDExists(data.sid)){
                sessions.get(data.sid).setTimestamp();
                switch(data.command){
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

    private loadPage(data){
        console.log("LOAD PAGE: " + data.page);

        //TODO: All

    }

    private loadPanel(data){
        console.log("LOAD PANEL: " + data.panel);
        if(func.isAdmin(data.sid)){

            //TODO: All

        }
    }

    private async login(data){
        if(func.validateUsernameAndPassword(data.username, data.password)){
            let session:Session = sessions.get(data.sid);
            if(session.getTries() < config.loginTries){
                let values = await this.db.select(func.getQueryUsernameAndPassword(this.db, data.username, data.password));
                if(values["length"] === 1){
                    if(values[0].admin === 1){
                        session.setAdmin(true);
                    }
                    let data2 = {
                        command: "setAdminPanel",
                        content: funcHTML.loadWidget("alessia_adminpanel").getHTML()
                    };
                    this.websocket.send(JSON.stringify(data2));
                }else{
                    session.addTry();
                    this.sendError("Username or password not found");
                }
            }else{
                this.sendError("Tried too often to login");
            }
        }else{
            this.sendError("Username and/or password contains illegal characters");
        }
    }

    private loginBySID(sid:string):void{
        if(config.developer_mode){
            let session:Session = sessions.get(sid);
            //session.setTimestamp();
            let data;
            if(session.isAdmin()){
                data = {
                    command: "setAdminPanel",
                    content: funcHTML.loadWidget("alessia_adminpanel").getHTML()
                };
            }else{
                data = {
                    command: "setAdminPanel",
                    content: funcHTML.loadWidget("alessia_adminpanel_login").getHTML()
                };
            }
            this.websocket.send(JSON.stringify(data));
        }
    }

    private logout(){
        console.log("LOGOUT");

        //TODO: All

        this.sendAlert("Logged out.");
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
        let sid:string = encryptor.getUID(8, 8);
        sessions.add(sid);
        let data = {
            command: "setSID",
            sid: sid
        };
        this.websocket.send(JSON.stringify(data));
    }
}