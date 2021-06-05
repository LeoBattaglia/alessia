var selina = require("selina");
var server = new selina.Server(false, 0, response);
server.init();
server.start();
function response(req) {
    return "RESPONSE";
}
//# sourceMappingURL=index.js.map