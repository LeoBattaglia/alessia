"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
const config = require("./lib/res/config.json");
const dilara_1 = require("dilara");
const executor_1 = require("./lib/executor");
const pkg = require("./package.json");
//Constants
const builder = require("./lib/builder");
const Selina = require("selina");
const server = new Selina.Server(false, 0, response);
const WS = require("ws");
const websocketServer = new WS.Server({ port: config.websocket_port });
//Init DB
let db = new dilara_1.DB("localhost", "root", "Msql$10", "alessia");
db.init("./lib/res/db.txt").then();
//Init Builder
builder.init();
//Start Server
server.init();
server.addCommand(new Selina.Command("sessions", "Show Sessions", executor_1.Executor.printSessions));
server.startListener();
server.start("Alessia-Framework " + pkg.version);
//Set Listener to Websocket-Server
websocketServer.on("connection", function connection(ws, req) {
    let executor = new executor_1.Executor(ws, db);
    ws.on("message", function incoming(message) {
        executor.execute(message, req);
    });
});
//Functions
function response(req) {
    return builder.response(req);
}
//# sourceMappingURL=index.js.map