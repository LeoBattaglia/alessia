//Constants
var builder = require("./lib/builder");
var selina = require("selina");
var server = new selina.Server(false, 0, response);
//const p = server.getPrompt();
//Start Server
server.init();
server.startListener();
server.start();
//Functions
function response(req) {
    return builder.response(req);
}
//# sourceMappingURL=index.js.map