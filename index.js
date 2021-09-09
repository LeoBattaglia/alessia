//Constants
const builder = require("./lib/builder");
const selina = require("selina");
const server = new selina.Server(false, 0, response);
//Start Server
server.init();
server.startListener();
server.start();
//Functions
function response(req) {
    return builder.response(req);
}
//# sourceMappingURL=index.js.map