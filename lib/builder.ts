//Imports
import * as config from "./res/config.json";
import  * as filetypes from "./res/filetypes.json"
import {CSSElement, CSSSourceCode, HTMLElement, HTMLSourceCode} from "derya";
import {Response} from "selina";
import * as sys from "samara";
import {URLObject} from "./urlObject";

//Constants
const fs = require("fs");

//Declarations
let css_main:CSSSourceCode;
let mode_admin:Boolean = false;
let sc:HTMLSourceCode;
let uo:URLObject;

//Functions
export function buildAdminPanel():HTMLSourceCode{
    let sc = new HTMLSourceCode();
    let tag:HTMLElement;

    sc.addContent("TEST");

    //TODO: Finish Admin-Panel

    return sc;
}

export function buildAdminPanelLogin():HTMLSourceCode{
    let sc = new HTMLSourceCode();
    let tag:HTMLElement;
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
    if(config.developer_mode){
        tag.addAttributeValue(config.page_login);
    }
    tag = sc.addInputDefault("password", "alessia_password", "password");
    tag.addAttributeClass("alessia_input_text");
    tag.addAttributePlaceholder("Password");
    if(config.developer_mode){
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

function buildBody():HTMLSourceCode{
    let sc = new HTMLSourceCode();
    sc.openBodyDefault();
    //tag.addStyleDisplayFlexRow();
    sc.openTagWithID("div", "alessia_div_body");

    //TODO: Load Page-Content

    sc.closeDiv();
    let tag:HTMLElement;
    if(uo.containsPara("admin", "1")){
        sc.openTagWithID("div", "alessia_div_admin");
        tag = sc.addImgDefault("Alessia.svg", "Alessia-Framework");
        tag.addStyleWidth("100%");
        sc.addSourceCode(buildAdminPanelLogin());
        sc.closeDiv();
    }else if(uo.containsPara("admin", "0")){
        mode_admin = false;
    }
    tag = sc.openScript();
    tag.addAttributeType("text/javascript");
    tag.addAttributeSrc("./lib/page.js");
    sc.closeScript();
    sc.closeBody();
    return sc;
}

function buildCSSMain():void{
    css_main = new CSSSourceCode("alessia");
    //Body
    let css:CSSElement = css_main.new("body");
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

function buildMeta():HTMLSourceCode{
    let sc = new HTMLSourceCode();
    !sys.isNull(config.charset)? sc.addCharset(config.charset): undefined;
    !sys.isNull(config.author)? sc.addMetaDefault("author", config.author): undefined;
    !sys.isNull(config.company)? sc.addMetaDefault("company", config.company): undefined;
    !sys.isNull(config.content_language)? sc.addMetaDefault("content-language", config.content_language): undefined;
    !sys.isNull(config.copyright)? sc.addMetaDefault("copyright", config.copyright): undefined;
    !sys.isNull(config.description)? sc.addMetaDefault("description", config.description): undefined;
    !sys.isNull(config.google_site_verification)? sc.addMetaDefault("google-site-verification", config.google_site_verification): undefined;
    !sys.isNull(config.keywords)? sc.addMetaDefault("keywords", config.keywords): undefined;
    !sys.isNull(config.page_topic)? sc.addMetaDefault("page-topic", config.page_topic): undefined;
    !sys.isNull(config.publisher)? sc.addMetaDefault("publisher", config.publisher): undefined;
    !sys.isNull(config.revisit_after)? sc.addMetaDefault("revisit-after", config.revisit_after): undefined;
    !sys.isNull(config.robots)? sc.addMetaDefault("robots", config.robots): undefined;
    !sys.isNull(config.viewport)? sc.addMetaDefault("viewport", config.viewport): undefined;
    return sc;
}

function buildPage():Response{
    sc = new HTMLSourceCode();
    sc.addDoctype();
    sc.openHTMLDefault();
    sc.openHead();
    sc.addTitle(config.title);
    sc.addSourceCode(buildMeta());
    let tag:HTMLElement = sc.addLink();
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
    sc.closeHtml()
    return new Response(200, "text/html", sc.getHTML());
}

function getContentType(path:string):string{
    let end = path.substring(path.lastIndexOf(".") + 1, path.length);
    for(let type of filetypes.types){
        if(end === type.name){
            return type.type;
        }
    }
    return undefined;
}

function getCSS():Response{
    //console.log("CSS-UO: " + uo.page);
    let css:CSSSourceCode;
    if(uo.page.toLowerCase().indexOf("alessia")){
        css = css_main;
    }else{

        //TODO: Get other CSS-Files

    }
    return new Response(200, "text/css", css.getCSS());
}

function getFile():Response{
    //let file:string = fs.readFileSync(uo.page);
    let slash:string;
    uo.page.substring(0, 1) === "/"? slash = "": slash="/";
    let path:string = "." + slash + uo.page;
    if(!fs.existsSync(path)){
        path = "./lib/res" + slash + uo.page;
    }
    return new Response(200, getContentType(path), fs.readFileSync(path));
}

export function init(){
    buildCSSMain();
}

export function response(req:Request):Response{
    uo = new URLObject(req.url);
    return route();
}

function route():Response{
    if(uo.isFile()){
        return getFile();
    }else if(uo.isCSS()){
        return getCSS();
    }else{
        return buildPage();
    }
}