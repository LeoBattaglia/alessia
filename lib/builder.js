"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
//Imports
const urlObject_1 = require("./urlObject");
const derya_1 = require("derya");
const sys = require("samara");
const config = require("./res/config.json");
const selina_1 = require("selina");
//Constants
const fs = require("fs");
//Declarations
let mode_admin = false;
let sc;
let uo;
//Functions
function buildBody() {
    let sc = new derya_1.HTMLSourceCode();
    let tag = sc.openTag("body");
    tag.addStyle("display", "flex");
    tag.addStyle("flex-direction", "row");
    tag.addStyle("height", "100%");
    tag.addStyle("margin", "0em");
    tag.addStyle("padding", "0em");
    tag.addStyle("width", "100%");
    tag = sc.openTag("div");
    tag.addStyle("height", "100%");
    tag.addStyle("width", "100%");
    //TODO: All
    sc.closeTag("div");
    if (uo.containsPara("admin", "1")) {
        tag = sc.openTag("div");
        //tag.addAttribute("class", "font-effect-neon")
        tag.addStyle("background-color", "SlateGray");
        tag.addStyle("display", "flex");
        tag.addStyle("flex-direction", "column");
        tag.addStyle("height", "calc(100% - 2em)");
        tag.addStyle("padding", "1em");
        tag.addStyle("width", "18em");
        tag = sc.openTag("a");
        tag.addStyle("font-family", "Alessia");
        tag.addStyle("font-size", "50pt");
        sc.addContent("Alessia");
        sc.closeTag("a");
        //TODO: All
        sc.closeTag("div");
    }
    else if (uo.containsPara("admin", "0")) {
        mode_admin = false;
    }
    sc.closeTag("body");
    return sc;
}
function buildMeta() {
    let sc = new derya_1.HTMLSourceCode();
    !sys.isNull(config.charset) ? sc.addCharset(config.charset) : undefined;
    !sys.isNull(config.author) ? sc.addMeta("author", config.author) : undefined;
    !sys.isNull(config.company) ? sc.addMeta("company", config.company) : undefined;
    !sys.isNull(config.content_language) ? sc.addMeta("content-language", config.content_language) : undefined;
    !sys.isNull(config.copyright) ? sc.addMeta("copyright", config.copyright) : undefined;
    !sys.isNull(config.description) ? sc.addMeta("description", config.description) : undefined;
    !sys.isNull(config.google_site_verification) ? sc.addMeta("google-site-verification", config.google_site_verification) : undefined;
    !sys.isNull(config.keywords) ? sc.addMeta("keywords", config.keywords) : undefined;
    !sys.isNull(config.page_topic) ? sc.addMeta("page-topic", config.page_topic) : undefined;
    !sys.isNull(config.publisher) ? sc.addMeta("publisher", config.publisher) : undefined;
    !sys.isNull(config.revisit_after) ? sc.addMeta("revisit-after", config.revisit_after) : undefined;
    !sys.isNull(config.robots) ? sc.addMeta("robots", config.robots) : undefined;
    !sys.isNull(config.viewport) ? sc.addMeta("viewport", config.viewport) : undefined;
    return sc;
}
function buildPage() {
    console.log("BP: " + uo.page);
    sc = new derya_1.HTMLSourceCode();
    sc.addDoctype();
    let tag = sc.openTag("html");
    tag.addStyle("height", "100%");
    tag.addStyle("width", "100%");
    sc.openTag("head");
    sc.addSourceCode(buildTitle());
    sc.addSourceCode(buildMeta());
    sc.openTag("style");
    sc.addContent("@font-face{font-family: \"Alessia\"; src: url(\"./lib/res/Apalu.ttf\");}");
    //sc.addContent("@import url('https://fonts.googleapis.com/css?family=Muli|Unica+One|Roboto+Condensed&display=swap');")
    //@import url('https://fonts.googleapis.com/css?family=Muli|Unica+One|Roboto+Condensed&display=swap');
    sc.closeTag("style");
    //tag = sc.addTag("link");
    //tag.addAttribute("rel", "stylesheet");
    //tag.addAttribute("href", "https://fonts.googleapis.com/css?family=Parisienne");
    sc.closeTag("head");
    sc.addSourceCode(buildBody());
    sc.closeTag("html");
    return new selina_1.Response(200, "text/html", sc.getHTML());
}
function buildTitle() {
    let sc = new derya_1.HTMLSourceCode();
    sc.openTag("title");
    sc.addContent(config.title);
    sc.closeTag("title");
    return sc;
}
function getFile() {
    console.log("FILE: " + uo.page);
    //let file:string = fs.readFileSync(uo.page);
    //TODO: All
    return new selina_1.Response(200, "text/plain", "TEST");
}
function response(req) {
    uo = new urlObject_1.URLObject(req.url);
    return route();
}
exports.response = response;
function route() {
    if (uo.isFile()) {
        return getFile();
    }
    else {
        return buildPage();
    }
}
//# sourceMappingURL=builder.js.map