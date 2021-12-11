"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
//Imports
const func = require("./html_functions");
const selina_1 = require("selina");
const urlObject_1 = require("./urlObject");
//Constants
const fs = require("fs");
//Functions
function getFile(uo) {
    //console.log("FFF: " + uo.url)
    let path;
    if (uo.url === "/fontawesome.js") {
        path = "./node_modules/@fortawesome/fontawesome-free/js/all.js";
    }
    else {
        let type = uo.getFileType();
        path = "./lib/res/";
        switch (type) {
            case "css":
                path += "styles/";
                break;
            case "ico":
                path += "icons/";
                break;
            case "jpg":
                path += "images/";
                break;
            case "js":
                path += "scripts/";
                break;
            case "pdf":
                path += "files/";
                break;
            case "png":
                path += "images/";
                break;
            case "svg":
                path += "images/";
                break;
            case "ttf":
                path += "fonts/";
                break;
        }
        path += uo.getTargetFile();
    }
    if (fs.existsSync(path)) {
        return new selina_1.Response(200, uo.getContentType(), fs.readFileSync(path));
    }
}
function response(req) {
    let uo = new urlObject_1.URLObject(req.url);
    return route(uo);
}
exports.response = response;
function route(uo) {
    if (uo.isFile()) {
        return getFile(uo);
    }
    else {
        return func.createPage(uo);
    }
}
//# sourceMappingURL=builder.js.map