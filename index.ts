//Imports
import * as config from "./lib/res/config.json";
import {DB} from "dilara";
import {Executor} from "./lib/executor";
import * as pkg from "./package.json";

//Constants
const builder = require("./lib/builder");
const Selina = require("selina");
const server = new Selina.Server(false, 0, response);
const WS = require("ws");
const websocketServer = new WS.Server({port: config.websocket_port});

//Init DB
let db:DB = new DB("localhost", "root", "Msql$10", "alessia");
db.init("./lib/res/db.txt").then();

//Init Builder
builder.init();

//Start Server
server.init();
server.addCommand(new Selina.Command("sessions", "Show Sessions", Executor.printSessions));
server.startListener();
server.start("Alessia-Framework " + pkg.version);

//Set Listener to Websocket-Server
websocketServer.on("connection", function connection(ws, req){
    let executor:Executor = new Executor(ws, db);
    ws.on("message", function incoming(message){
        executor.execute(message, req);
    });
});

//Functions
function response(req:Request):string{
    return builder.response(req);
}