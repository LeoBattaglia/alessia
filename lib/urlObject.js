"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLObject = void 0;
const filetypes = require("./res/filetypes.json");
const sys = require("samara");
//Classes
class URLObject {
    //Constructor
    constructor(url) {
        this.page = "";
        this.paras = [];
        this.url = url;
        this.cutURL();
    }
    //Methods
    containsPara(para, value) {
        for (let line of this.paras) {
            if (line.indexOf("=") > -1) {
                if (line.indexOf("=") > 0) {
                    let paras = line.split("=");
                    if (sys.isNull(value)) {
                        if (para === paras[0]) {
                            return true;
                        }
                    }
                    else {
                        if (para === paras[0] && value === paras[1]) {
                            return true;
                        }
                    }
                }
            }
            else {
                if (para === line) {
                    return true;
                }
            }
            return false;
        }
    }
    cutURL() {
        if (this.url.indexOf("?") < 0) {
            this.page = this.url;
        }
        else {
            this.page = this.url.substr(0, this.url.indexOf("?"));
            let paras = this.url.substr(this.url.indexOf("?") + 1, this.url.length);
            if (paras.indexOf("&") < 0) {
                this.paras = [paras];
            }
            else {
                this.paras = paras.split("&");
            }
        }
        //console.log("RRR: " + this.page);
    }
    isFile() {
        for (let type of filetypes.types) {
            if (this.page.indexOf("." + type) === this.page.length - type.length - 1) {
                return true;
            }
        }
        return false;
    }
    //Get-Methods
    get page() {
        return this._page;
    }
    get paras() {
        return this._paras;
    }
    get url() {
        return this._url;
    }
    //Set-Methods
    set page(value) {
        this._page = value;
    }
    set paras(values) {
        this._paras = values;
    }
    set url(value) {
        this._url = value;
    }
}
exports.URLObject = URLObject;
//# sourceMappingURL=urlObject.js.map