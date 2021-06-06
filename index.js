//Constants
var selina = require("selina");
var server = new selina.Server(false, 0, response);
var p = server.getPrompt();
//Start Server
server.init();
server.startListener();
server.start();
//Functions
function response(req) {
    return "RESPONSE";
}
//# sourceMappingURL=index.js.map