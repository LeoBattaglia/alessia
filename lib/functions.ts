//Imports
import {DB} from "dilara";
import {Encryptor} from "lorena";
import {MySQL_Select} from "dilara";
import {Session, sessions} from "./session";
//import exp = require("constants");

//Constants
const encryptor:Encryptor = new Encryptor();
const milena = require("milena");
const p = new milena.Prompt();

//Functions
export function checkSessionIDExists(sid:string):Boolean{
    return sessions.exists(sid);
}

export function getQueryUsernameAndPassword(db:DB, username:string, password:string):MySQL_Select{
    let query:MySQL_Select = db.getEmptySelectQuery("user", "*");
    query.addWhere("username='" + username + "'");
    query.addWhere("password='" + password + "'");
    query.addWhere("active=1");
    return query;
}

export function isAdmin(sid:string):Boolean{
    let session:Session = sessions.get(sid);
    if(session.isAdmin()){
        return true;
    }else{
        return false;
    }
}

export function printSessions():void{
    p.printLine();
    p.printColorYellow("Sessions:");
    for(let session of sessions.getSessions()){
        p.print("SID: " + session.getSID());
    }
}

export function validateUsernameAndPassword(username:string, password:string):Boolean{
    if(encryptor.validateString(username, true, true, true, false) &&
        encryptor.validateString(password, true, true, true, true)){
        return true;
    }else{
        return false;
    }

}