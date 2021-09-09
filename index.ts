//Constants
const builder = require("./lib/builder")
const selina = require("selina");
const server = new selina.Server(false, 0, response);

//Start Server
server.init();
server.startListener();
server.start();

//Functions
function response(req:Request):string{
    return builder.response(req);
}