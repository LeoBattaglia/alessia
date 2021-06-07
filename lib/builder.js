"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
//Constants
var urlObject = require("./urlObject");
//Declarations
var uo;
//Functions
function getEmptyPage() {
    var src = new HTMLCode();
    src.add("<!DOCTYPE html>");
    src.add("<html>");
    src.add("<head>");
    src.add("<title>Alessia-Framework</title>");
    src.add("</head>");
    src.add("<body>");
    src.add("</body>");
    src.add("</html>");
    return src;
}
function loadPage(page) {
    var src = getEmptyPage();
    //TODO: All
    return src.src;
}
function response(req) {
    var res = "";
    uo = new urlObject.URLObject(req.url);
    res += loadPage(uo.page);
    //TODO: Display Editor
    return res;
}
exports.response = response;
//Classes
var HTMLCode = /** @class */ (function () {
    //Constructor
    function HTMLCode() {
        this.src = "";
    }
    //Functions
    HTMLCode.prototype.add = function (value) {
        this.src += value + "\n";
    };
    Object.defineProperty(HTMLCode.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (value) {
            this._src = value;
        },
        enumerable: false,
        configurable: true
    });
    return HTMLCode;
}());
//# sourceMappingURL=builder.js.map