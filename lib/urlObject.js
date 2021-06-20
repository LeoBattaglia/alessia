"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLObject = void 0;
//Classes
class URLObject {
    //Constructor
    constructor(url) {
        this.page = "";
        this.paras = [];
        this.url = url;
        this.cutURL();
    }
    //Functions
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
    }
    get page() {
        return this._page;
    }
    get paras() {
        return this._paras;
    }
    get url() {
        return this._url;
    }
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