"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUsernameAndPassword = exports.printSessions = exports.isAdmin = exports.getQueryUsernameAndPassword = exports.checkSessionIDExists = void 0;
const lorena_1 = require("lorena");
const session_1 = require("./session");
//import exp = require("constants");
//Constants
const encryptor = new lorena_1.Encryptor();
const milena = require("milena");
const p = new milena.Prompt();
//Functions
function checkSessionIDExists(sid) {
    return session_1.sessions.exists(sid);
}
exports.checkSessionIDExists = checkSessionIDExists;
function getQueryUsernameAndPassword(db, username, password) {
    let query = db.getEmptySelectQuery("user", "*");
    query.addWhere("username='" + username + "'");
    query.addWhere("password='" + password + "'");
    query.addWhere("active=1");
    return query;
}
exports.getQueryUsernameAndPassword = getQueryUsernameAndPassword;
function isAdmin(sid) {
    let session = session_1.sessions.get(sid);
    if (session.isAdmin()) {
        return true;
    }
    else {
        return false;
    }
}
exports.isAdmin = isAdmin;
function printSessions() {
    p.printLine();
    p.printColorYellow("Sessions:");
    for (let session of session_1.sessions.getSessions()) {
        p.print("SID: " + session.getSID());
    }
}
exports.printSessions = printSessions;
function validateUsernameAndPassword(username, password) {
    if (encryptor.validateString(username, true, true, true, false) &&
        encryptor.validateString(password, true, true, true, true)) {
        return true;
    }
    else {
        return false;
    }
}
exports.validateUsernameAndPassword = validateUsernameAndPassword;
//# sourceMappingURL=functions.js.map