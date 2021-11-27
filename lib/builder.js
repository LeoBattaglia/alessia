"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.init = exports.buildAdminPanelLogin = exports.buildAdminPanel = void 0;
//Imports
const config = require("./res/config.json");
const filetypes = require("./res/filetypes.json");
const derya_1 = require("derya");
const selina_1 = require("selina");
const sys = require("samara");
const urlObject_1 = require("./urlObject");
//Constants
const fs = require("fs");
//Declarations
let css_main;
let mode_admin = false;
let sc;
let uo;
//Functions
function buildAdminPanel() {
    let sc = new derya_1.HTMLSourceCode();
    let tag;
    sc.addContent("TEST");
    //TODO: Finish Admin-Panel
    return sc;
}
exports.buildAdminPanel = buildAdminPanel;
function buildAdminPanelLogin() {
    let sc = new derya_1.HTMLSourceCode();
    let tag;
    /*sc.openTagWithID("div", "alessia_div_admin");
    tag = sc.addImgDefault("Alessia.svg", "Alessia-Framework");
    tag.addStyleWidth("100%");*/
    sc.openForm();
    tag = sc.openTagWithID("div", "alessia_div_admin_panel");
    tag.addStyleDisplayFlexColumn();
    tag.addStyleRowGap("0.3em");
    tag = sc.addInputDefault("text", "alessia_username", "username");
    tag.addAttributeClass("alessia_input_text");
    tag.addAttributePlaceholder("Username");
    if (config.developer_mode) {
        tag.addAttributeValue(config.page_login);
    }
    tag = sc.addInputDefault("password", "alessia_password", "password");
    tag.addAttributeClass("alessia_input_text");
    tag.addAttributePlaceholder("Password");
    if (config.developer_mode) {
        tag.addAttributeValue(config.page_pw);
    }
    tag = sc.addInputDefault("button", "alessia_login", "login");
    tag.addAttributeOnclick("log_in();");
    tag.addAttributeValue("Login");
    sc.closeDiv();
    sc.closeForm();
    //sc.closeDiv();
    return sc;
}
exports.buildAdminPanelLogin = buildAdminPanelLogin;
function buildBody() {
    let sc = new derya_1.HTMLSourceCode();
    sc.openBodyDefault();
    //tag.addStyleDisplayFlexRow();
    sc.openTagWithID("div", "alessia_div_body");
    //TODO: Load Page-Content
    sc.closeDiv();
    let tag;
    if (uo.containsPara("admin", "1")) {
        sc.openTagWithID("div", "alessia_div_admin");
        tag = sc.addImgDefault("Alessia.svg", "Alessia-Framework");
        tag.addStyleWidth("100%");
        sc.addSourceCode(buildAdminPanelLogin());
        sc.closeDiv();
    }
    else if (uo.containsPara("admin", "0")) {
        mode_admin = false;
    }
    tag = sc.openScript();
    tag.addAttributeType("text/javascript");
    tag.addAttributeSrc("./lib/page.js");
    sc.closeScript();
    sc.closeBody();
    return sc;
}
function buildCSSMain() {
    css_main = new derya_1.CSSSourceCode("alessia");
    //Body
    let css = css_main.new("body");
    css.addPropertyDisplay("flex");
    css.addPropertyFlexDirection("row");
    //Div-Body
    css = css_main.new("#alessia_div_body");
    css.addPropertyBackgroundColor("#202020");
    css.addPropertyHeight("100%");
    css.addPropertyWidth("100%");
    //Div-Admin
    css = css_main.new("#alessia_div_admin");
    css.addPropertyBackgroundColor("#2b2b2b");
    css.addPropertyColor("white");
    css.addPropertyDisplay("flex");
    css.addPropertyFlexDirection("column");
    css.addPropertyFontFamily("Muli");
    css.addPropertyHeight("calc(100% - 1em)");
    css.addPropertyPadding("0.5em");
    css.addPropertyRowGap("0.5em");
    css.addPropertyWidth("18em");
    //Input-Text
    css = css_main.new(".alessia_input_text");
    css.addPropertyBackgroundColor("#202020");
    css.addPropertyBorder("1px inset #505050");
    css.addPropertyBorderRadius("1em");
    css.addPropertyColor("white");
    css.addPropertyPaddingLeft("0.5em");
    //Login
    css = css_main.new("#alessia_login");
    css.addPropertyBackgroundColor("#3b3b3b");
    css.addPropertyBorder("1px outset #505050");
    css.addPropertyBorderRadius("1em");
    css.addPropertyColor("#cccccc");
    css = css_main.new("#alessia_login:active");
    css.addProperty("border", "1px inset #505050");
    css = css_main.new("#alessia_login:hover");
    css.addProperty("background-color", "#4b4b4b");
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
    let tag = sc.addLink();
    tag.addAttributeHref("alessia.css");
    tag.addAttributeRel("stylesheet");
    tag.addAttributeType("text/css");
    sc.openTag("style");
    sc.addContent("@import url('https://fonts.googleapis.com/css?family=Muli');");
    //@import url('https://fonts.googleapis.com/css?family=Muli|Unica+One|Roboto+Condensed&display=swap');
    //sc.addContent("@font-face{font-family: \"Alessia\"; src: url(\"/Apalu.ttf\");}")
    sc.closeTag("style");
    sc.closeHead();
    sc.addSourceCode(buildBody());
    sc.closeHtml();
    return new selina_1.Response(200, "text/html", sc.getHTML());
}
function getContentType(path) {
    let end = path.substring(path.lastIndexOf(".") + 1, path.length);
    for (let type of filetypes.types) {
        if (end === type.name) {
            return type.type;
        }
    }
    return undefined;
}
function getCSS() {
    //console.log("CSS-UO: " + uo.page);
    let css;
    if (uo.page.toLowerCase().indexOf("alessia")) {
        css = css_main;
    }
    else {
        //TODO: Get other CSS-Files
    }
    return new selina_1.Response(200, "text/css", css.getCSS());
}
function getFile() {
    //let file:string = fs.readFileSync(uo.page);
    let slash;
    uo.page.substring(0, 1) === "/" ? slash = "" : slash = "/";
    let path = "." + slash + uo.page;
    if (!fs.existsSync(path)) {
        path = "./lib/res" + slash + uo.page;
    }
    return new selina_1.Response(200, getContentType(path), fs.readFileSync(path));
}
function init() {
    buildCSSMain();
}
exports.init = init;
function response(req) {
    uo = new urlObject_1.URLObject(req.url);
    return route();
}
exports.response = response;
function route() {
    if (uo.isFile()) {
        return getFile();
    }
    else if (uo.isCSS()) {
        return getCSS();
    }
    else {
        return buildPage();
    }
}
//# sourceMappingURL=builder.js.map