"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadWidget = exports.createPage = void 0;
//Imports
const config = require("./res/config.json");
const derya_1 = require("derya");
const selina_1 = require("selina");
const sys = require("samara/index");
//Classes
class Parameter {
    //Constructor
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}
class Widget {
    //Constructor
    constructor(name) {
        this.name = name;
    }
    //Methods
    addPara(para) {
        this.paras.push(para);
    }
}
class WidgetExtract {
    //Constructor
    constructor(begin, end, widget) {
        this.begin = begin;
        this.end = end;
        this.widget = widget;
    }
}
//Functions
/*export function createAdminPanel():HTMLSourceCode{
    let sc = new HTMLSourceCode();
    let tag:HTMLElement;
    tag = sc.openDiv();
    tag.addStyleDisplayFlexRow();
    tag.addStyleJustifyContent("center");
    tag.addStyleColumnGap("0.5em");
    sc.addSourceCode(createButtonAdmin("settings", "Settings", "loadPanel('Settings')", 24));
    sc.addSourceCode(createButtonAdmin("account_tree", "Page-Tree", "loadPanel('PageTree')", 24));
    sc.addSourceCode(createButtonAdmin("widgets", "Widget-Editor", "loadPanel('WidgetEditor')", 24));
    sc.addSourceCode(createButtonAdmin("logout", "Logout", "logout()", 24));
    sc.closeDiv();
    tag = sc.openDiv();
    tag.addStyleDisplayFlexRow();
    tag.addStyleJustifyContent("center");
    tag.addStyleColumnGap("0.5em");
    tag.addStyleMarginTop("0.15em");
    sc.addSourceCode(createButtonAdmin("html", "Page-Editor", "loadPanel('PageEditor')", 36));
    sc.addSourceCode(createButtonAdmin("css", "Style-Editor", "loadPanel('StyleEditor')", 36));
    sc.addSourceCode(createButtonAdmin("javascript", "Code-Editor", "loadPanel('CodeEditor')", 36));
    sc.addSourceCode(createButtonAdmin("table_chart", "Data-Editor", "loadPanel('DataEditor')", 24));
    sc.closeDiv();
    tag = sc.openDivWithClass("alessia_line_horizontal");
    tag.addStyleMarginTop("0.8em");
    sc.closeDiv();
    tag = sc.openDivWithID("alessia_page");
    tag.addStyleDisplayFlexRow();
    tag.addStyleMarginTop("-0.15em");
    tag.addStyleWidth("80%");
    sc.addContent("Page: Index")
    sc.closeDiv();
    sc.openDivWithClass("alessia_line_horizontal");
    sc.closeDiv();
    tag = sc.openDivWithID("alessia_div_admin_subpanel");
    tag.addStyleDisplayFlexColumn();
    sc.closeDiv();
    return sc;
}*/
/*export function createAdminPanelLogin():HTMLSourceCode{
    let sc = new HTMLSourceCode();
    let tag:HTMLElement;
    tag = sc.addInputDefault("text", "alessia_username", "username");
    tag.addAttributeClass("alessia_input_text");
    tag.addAttributePlaceholder("Username");
    if(config.developer_mode){
        tag.addAttributeValue(config.page_login);
    }
    tag = sc.addInputDefault("password", "alessia_password", "password");
    tag.addAttributeClass("alessia_input_text");
    tag.addAttributePlaceholder("Password");
    if(config.developer_mode){
        tag.addAttributeValue(config.page_pw);
    }
    tag = sc.openDiv();
    tag.addStyleMarginTop("0.3em");
    //sc.addSourceCode(createButtonAdmin("login", "Login", "log_in()", 24));
    let para_name:Parameter = new Parameter("name", "login");
    let para_title:Parameter = new Parameter("title", "Login");
    let para_function:Parameter = new Parameter("function", "log_in()");
    let para_size:Parameter = new Parameter("size", "24");
    sc.addSourceCode(loadWidget("alessia_button_admin", para_name, para_title, para_function, para_size));
    sc.closeDiv();
    return sc;
}*/
function createBody(uo) {
    let sc = new derya_1.HTMLSourceCode();
    sc.openBodyDefault();
    sc.openTagWithID("div", "alessia_div_body");
    sc.closeDiv();
    let tag;
    if (config.admin_mode_enabled && uo.containsPara("admin", "1")) {
        sc.openDivWithID("alessia_div_admin");
        sc.addSourceCode(loadWidget("alessia_logo"));
        sc.openDivWithID("alessia_div_admin_panel");
        sc.addSourceCode(loadWidget("alessia_adminpanel_login"));
        sc.closeDiv();
        sc.closeDiv();
    }
    tag = sc.openScript();
    tag.addAttributeType("text/javascript");
    tag.addAttributeSrc("alessia.js");
    sc.closeScript();
    sc.closeBody();
    return sc;
}
function createButtonAdmin(name, title, functionName, md_size) {
    let sc = new derya_1.HTMLSourceCode();
    let tag;
    tag = sc.openDivWithClass("alessia_button");
    tag.addAttributeTitle(title);
    tag.addAttributeOnclick(functionName + ";");
    tag.addStyleCursor("pointer");
    sc.addIcon(name, ["md-" + md_size]);
    sc.closeDiv();
    return sc;
}
function createMeta() {
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
function createPage(uo) {
    //console.log("UO: " + uo.target + " || " + uo.url)
    let sc = new derya_1.HTMLSourceCode();
    sc.addDoctype();
    sc.openHTMLDefault();
    sc.openHead();
    sc.addTitle(config.title);
    sc.addSourceCode(createMeta());
    let tag = sc.addLink();
    tag.addAttributeHref("alessia.css");
    tag.addAttributeRel("stylesheet");
    tag.addAttributeType("text/css");
    tag = sc.addLink();
    tag.addAttributeHref("https://fonts.googleapis.com/icon?family=Material+Icons");
    tag.addAttributeRel("stylesheet");
    sc.openStyle();
    sc.addContent("@import url('https://fonts.googleapis.com/css?family=Muli|Fredericka+the+Great');");
    //@import url('https://fonts.googleapis.com/css?family=Muli|Unica+One|Roboto+Condensed&display=swap');
    //sc.addContent("@font-face{font-family: \"Alessia\"; src: url(\"/Apalu.ttf\");}")
    //<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    /*
    <script defer src="/your-path-to-fontawesome/js/brands.js"></script>
    <script defer src="/your-path-to-fontawesome/js/solid.js"></script>
    <script defer src="/your-path-to-fontawesome/js/fontawesome.js"></script>
     */
    sc.closeStyle();
    sc.addContentUnsafe("<script defer src=\"fontawesome.js\"></script>");
    sc.closeHead();
    sc.addSourceCode(createBody(uo));
    sc.closeHtml();
    return new selina_1.Response(200, "text/html", sc.getHTML());
}
exports.createPage = createPage;
function extractWidgets(sc) {
    //console.log("EW: " + sc);
    while (sc.indexOf("<widget") > -1 && sc.indexOf("</widget>") > sc.indexOf("<widget")) {
        let begin = sc.substring(0, sc.indexOf("<widget"));
        let end = sc.substring(sc.indexOf("</widget>") + "</widget>".length, sc.length);
        let widget = sc.substring(sc.indexOf("<widget"), sc.indexOf("</widget>"));
        //console.log("\nWD: " + widget);
        let name = widget.substring(widget.indexOf("name=\"") + 6, widget.indexOf("\">")).toLowerCase().trim();
        //console.log("NAME: " + name);
        let str = widget.substring(widget.indexOf("\">") + 2, widget.length);
        str = sys.removeBreaksAndTabs(str);
        str = sys.removeDoubleSpaces(str).trim();
        //console.log("PARAS-STR: " + str);
        let split = str.split(";");
        let paras = [];
        for (let s of split) {
            let p = s.split(":");
            if (!sys.isNull(p[0]) && !sys.isNull(p[1])) {
                //console.log("DDD: " + p[0] + "/" + p[1]);
                paras.push(new Parameter(p[0].trim(), p[1].trim()));
            }
        }
        widget = loadWidget(name, paras).getHTML();
        sc = begin + widget + end;
    }
    return sc;
}
function loadWidget(name, paras) {
    let file = sys.readFile("./lib/res/widgets/" + name + ".html");
    if (paras !== undefined) {
        for (let para of paras) {
            while (file.indexOf("$" + para.name.toUpperCase()) > -1) {
                file = file.replace("$" + para.name.toUpperCase(), para.value);
            }
        }
    }
    return new derya_1.HTMLSourceCode(extractWidgets(file));
}
exports.loadWidget = loadWidget;
//# sourceMappingURL=html_functions.js.map