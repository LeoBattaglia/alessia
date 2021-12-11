"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessions = exports.Session = void 0;
//Imports
const config = require("./res/config.json");
//Classes
class Session {
    //Constructor
    constructor(sid) {
        this.admin = false;
        this.sid = sid;
        this.setTimestamp();
        this.tries = 0;
    }
    //Methods
    addTry() {
        this.tries++;
    }
    getSID() {
        return this.sid;
    }
    getTimestamp() {
        return this.timestamp;
    }
    getTries() {
        return this.tries;
    }
    isAdmin() {
        return this.admin;
    }
    setAdmin(admin) {
        this.admin = admin;
    }
    setTimestamp() {
        this.timestamp = Date.now();
    }
}
exports.Session = Session;
class Sessions {
    //Constructor
    constructor() {
        this.isRemoving = false;
        this.sessions = [];
    }
    //Methods
    add(sid) {
        this.sessions.push(new Session(sid));
    }
    exists(sid) {
        for (let session of this.sessions) {
            if (session.getSID() === sid) {
                return true;
            }
        }
        return false;
    }
    get(sid) {
        for (let session of this.sessions) {
            if (session.getSID() === sid) {
                return session;
            }
        }
        return undefined;
    }
    getSessions() {
        return this.sessions;
    }
    removeOldSessions() {
        if (!this.isRemoving) {
            this.isRemoving = true;
            let timestamp = Date.now();
            for (let i = 0; i < this.sessions.length; i++) {
                if ((timestamp - this.sessions[i].getTimestamp()) > (config.removeSessionSeconds * 1000)) {
                    this.sessions = this.sessions.splice(i, 1);
                    i--;
                }
            }
            this.isRemoving = false;
        }
    }
}
//Export-Constants
exports.sessions = new Sessions();
//# sourceMappingURL=session.js.map