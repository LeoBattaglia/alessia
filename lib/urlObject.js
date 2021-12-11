"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLObject = void 0;
//Imports
const filetypes = require("./res/filetypes.json");
const sys = require("samara");
//Classes
class URLObject {
    //Constructor
    constructor(url) {
        this.paras = [];
        this.target = "";
        this.url = url.trim().toLowerCase();
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
        }
        return false;
    }
    cutURL() {
        if (this.url.indexOf("?") < 0) {
            this.target = this.url;
        }
        else {
            this.target = this.url.substring(0, this.url.indexOf("?"));
            let paras = this.url.substring(this.url.indexOf("?") + 1, this.url.length);
            if (paras.indexOf("&") < 0) {
                this.paras = [paras];
            }
            else {
                this.paras = paras.split("&");
            }
        }
        //console.log("RRR: " + this.page);
    }
    getContentType() {
        let end = this.target.substring(this.target.lastIndexOf(".") + 1, this.target.length);
        for (let type of filetypes.types) {
            if (end === type.name) {
                return type.type;
            }
        }
        return undefined;
    }
    getFileType() {
        return this.target.substring(this.target.indexOf(".") + 1, this.target.length);
    }
    getTargetFile() {
        let file = this.target;
        while (file.indexOf("/") > -1) {
            file = file.substring(file.indexOf("/") + 1, file.length);
        }
        return file;
    }
    isFile() {
        for (let type of filetypes.types) {
            if (this.target.indexOf("." + type.name) === this.target.length - type.name.length - 1) {
                return true;
            }
        }
        return false;
    }
    //Get-Methods
    get paras() {
        return this._paras;
    }
    get target() {
        return this._target;
    }
    get url() {
        return this._url;
    }
    //Set-Methods
    set paras(values) {
        this._paras = values;
    }
    set target(value) {
        this._target = value;
    }
    set url(value) {
        this._url = value;
    }
}
exports.URLObject = URLObject;
//# sourceMappingURL=urlObject.js.map