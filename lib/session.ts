//Imports
import * as config from "./res/config.json";

//Classes
export class Session{
    //Declarations
    private admin:Boolean;
    private readonly sid:string;
    private readonly timestamp:number;
    private tries:number;

    //Constructor
    constructor(sid:string){
        this.admin = false;
        this.sid = sid;
        this.timestamp = Date.now();
        this.tries = 0;
    }

    //Methods
    addTry():void{
        this.tries++;
    }

    getSID():string{
        return this.sid;
    }

    getTimestamp():number{
        return this.timestamp;
    }

    getTries():number{
        return this.tries;
    }

    isAdmin():Boolean{
        return this.admin;
    }

    setAdmin(admin:Boolean):void{
        this.admin = admin;
    }
}

class Sessions{
    //Declarations
    private isRemoving:Boolean;
    private sessions:Session[];

    //Constructor
    constructor(){
        this.isRemoving = false;
        this.sessions = [];
    }

    //Methods
    add(sid:string):void{
        this.sessions.push(new Session(sid));
    }

    exists(sid:string):Boolean{
        for(let session of this.sessions){
            if(session.getSID() === sid){
                return true;
            }
        }
        return false;
    }

    get(sid:string):Session{
        for(let session of this.sessions){
            if(session.getSID() === sid){
                return session;
            }
        }
        return undefined;
    }

    getSessions():Session[]{
        return this.sessions;
    }

    removeOldSessions():void{
        if(!this.isRemoving){
            this.isRemoving = true;
            let timestamp = Date.now();
            for(let i:number = 0; i < this.sessions.length; i++){
                if((timestamp - this.sessions[i].getTimestamp()) > (config.removeSessionSeconds * 1000)){
                    this.sessions = this.sessions.splice(i, 1);
                    i--;
                }
            }
            this.isRemoving = false;
        }
    }
}

//Export-Constants
export const sessions:Sessions = new Sessions();