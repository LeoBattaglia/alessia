"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
//Imports
const urlObject_1 = require("./urlObject");
const derya_1 = require("derya");
const sys = require("samara");
const config = require("./res/config.json");
const selina_1 = require("selina");
const filetypes = require("./res/filetypes.json");
//Constants
const fs = require("fs");
//Declarations
let mode_admin = false;
let sc;
let uo;
//Functions
function buildBody() {
    let sc = new derya_1.HTMLSourceCode();
    let tag = sc.openBodyDefault();
    tag.addStyleDisplayFlexRow();
    tag = sc.openTagWithID("div", "div_body");
    tag.addStyleSizes("100%", "100%");
    //TODO: Load Page-Content
    sc.closeDiv();
    if (uo.containsPara("admin", "1")) {
        tag = sc.openDiv();
        //tag.addAttribute("class", "font-effect-neon")
        tag.addStyleBackgroundColor("#334c81");
        tag.addStyleDisplayFlexColumn();
        tag.addStyleSizes("18em", "calc(100% - 2em)");
        tag.addStylePadding("1em");
        tag = sc.addImgDefault("Alessia.svg", "Alessia-Framework");
        tag.addStyleWidth("100%");
        tag = sc.openForm();
        tag.addAttributeAction("-");
        tag = sc.openLabel();
        tag.addAttribute("for", "email");
        sc.addContent("Mail");
        tag = sc.closeTag("label");
        tag = sc.addTag("input");
        tag.addAttribute("type", "text");
        tag.addAttribute("id", "email");
        tag.addAttribute("name", "email");
        tag.addStyle("width", "100%");
        //TODO: Finish Admin-Panel
        sc.closeForm();
        sc.closeDiv();
    }
    else if (uo.containsPara("admin", "0")) {
        mode_admin = false;
    }
    sc.closeBody();
    return sc;
}
function buildMeta() {
    let sc = new derya_1.HTMLSourceCode();
    !sys.isNull(config.charset) ? sc.addCharset(config.charset) : undefined;
    !sys.isNull(config.author) ? sc.addMetaDefault("author", config.author) : undefined;
    !sys.isNull(config.company) ? sc.addMetaDefault("company", config.company) : undefined;
    !sys.isNull(config.content_language) ? sc.addMetaDefault("content-language", config.content_language) : undefined;
    !sys.isNull(config.copyright) ? sc.addMetaDefault("copyright", config.copyright) : undefined;
    !sys.isNull(config.description) ? sc.addMetaDefault("description", config.description) : undefined;
    !sys.isNull(config.google_site_verification) ? sc.addMetaDefault("google-site-verification", config.google_site_verification) : undefined;
    !sys.isNull(config.keywords) ? sc.addMetaDefault("keywords", config.keywords) : undefined;
    !sys.isNull(config.page_topic) ? sc.addMetaDefault("page-topic", config.page_topic) : undefined;
    !sys.isNull(config.publisher) ? sc.addMetaDefault("publisher", config.publisher) : undefined;
    !sys.isNull(config.revisit_after) ? sc.addMetaDefault("revisit-after", config.revisit_after) : undefined;
    !sys.isNull(config.robots) ? sc.addMetaDefault("robots", config.robots) : undefined;
    !sys.isNull(config.viewport) ? sc.addMetaDefault("viewport", config.viewport) : undefined;
    return sc;
}
function buildPage() {
    sc = new derya_1.HTMLSourceCode();
    sc.addDoctype();
    sc.openHTMLDefault();
    sc.openHead();
    sc.addTitle(config.title);
    sc.addSourceCode(buildMeta());
    //sc.openTag("style");
    //sc.addContent("@font-face{font-family: \"Alessia\"; src: url(\"/Apalu.ttf\");}")
    //sc.closeTag("style");
    sc.closeHead();
    sc.addSourceCode(buildBody());
    sc.closeHtml();
    return new selina_1.Response(200, "text/html", sc.getHTML());
}
function getContentType(path) {
    let end = path.substr(path.lastIndexOf(".") + 1, path.length);
    for (let type of filetypes.types) {
        if (end === type.name) {
            return type.type;
        }
    }
    return undefined;
}
function getFile() {
    //let file:string = fs.readFileSync(uo.page);
    let slash;
    uo.page.substr(0, 1) === "/" ? slash = "" : slash = "/";
    let path = "./lib/res" + slash + uo.page;
    return new selina_1.Response(200, getContentType(path), fs.readFileSync(path));
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