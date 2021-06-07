"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLObject = void 0;
//Classes
var URLObject = /** @class */ (function () {
    //Constructor
    function URLObject(url) {
        this.page = "";
        this.paras = [];
        this.url = url;
        this.cutURL();
    }
    //Functions
    URLObject.prototype.cutURL = function () {
        if (this.url.indexOf("?") < 0) {
            this.page = this.url;
        }
        else {
            this.page = this.url.substr(0, this.url.indexOf("?"));
            var paras = this.url.substr(this.url.indexOf("?") + 1, this.url.length);
            if (paras.indexOf("&") < 0) {
                this.paras = [paras];
            }
            else {
                this.paras = paras.split("&");
            }
        }
    };
    Object.defineProperty(URLObject.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (value) {
            this._page = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(URLObject.prototype, "paras", {
        get: function () {
            return this._paras;
        },
        set: function (values) {
            this._paras = values;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(URLObject.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (value) {
            this._url = value;
        },
        enumerable: false,
        configurable: true
    });
    return URLObject;
}());
exports.URLObject = URLObject;
//# sourceMappingURL=urlObject.js.map