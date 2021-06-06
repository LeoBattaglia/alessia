//Constants
const selina = require("selina");
const server = new selina.Server(false, 0, response);
const p = server.getPrompt();

//Start Server
server.init();
server.startListener();
server.start();

//Functions
function response(req:Request):string{
    return "RESPONSE";
}