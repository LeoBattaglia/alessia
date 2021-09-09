//Imports
import {URLObject} from "./urlObject";
import {HTMLElement, HTMLSourceCode} from "derya";
import * as sys from "samara";
import * as config from "./res/config.json";
import {Response} from "selina";
import  * as filetypes from "./res/filetypes.json"

//Constants
const fs = require("fs");

//Declarations
let mode_admin:Boolean = false;
let sc:HTMLSourceCode;
let uo:URLObject;


//Functions
function buildBody():HTMLSourceCode{
    let sc = new HTMLSourceCode();
    let tag:HTMLElement = sc.openTag("body");
    tag.addStyle("display", "flex");
    tag.addStyle("flex-direction", "row");
    tag.addStyle("height", "100%");
    tag.addStyle("margin", "0em");
    tag.addStyle("padding", "0em");
    tag.addStyle("width", "100%");
    tag = sc.openTag("div");
    tag.addStyle("height", "100%");
    tag.addStyle("width", "100%");

    //TODO: Load Page-Content

    sc.closeTag("div");
    if(uo.containsPara("admin", "1")){
        tag = sc.openTag("div");
        //tag.addAttribute("class", "font-effect-neon")
        tag.addStyle("background-color", "#334c81");
        tag.addStyle("display", "flex");
        tag.addStyle("flex-direction", "column");
        tag.addStyle("height", "calc(100% - 2em)");
        tag.addStyle("padding", "1em");
        tag.addStyle("width", "18em");
        tag = sc.addTag("img");
        tag.addStyle("width", "100%");
        tag.addAttribute("src", "Alessia.svg");

        //TODO: Finish Admin-Panel

        sc.closeTag("div");
    }else if(uo.containsPara("admin", "0")){
        mode_admin = false;
    }
    sc.closeTag("body");
    return sc;
}

function buildMeta():HTMLSourceCode{
    let sc = new HTMLSourceCode();
    !sys.isNull(config.charset)? sc.addCharset(config.charset): undefined;
    !sys.isNull(config.author)? sc.addMeta("author", config.author): undefined;
    !sys.isNull(config.company)? sc.addMeta("company", config.company): undefined;
    !sys.isNull(config.content_language)? sc.addMeta("content-language", config.content_language): undefined;
    !sys.isNull(config.copyright)? sc.addMeta("copyright", config.copyright): undefined;
    !sys.isNull(config.description)? sc.addMeta("description", config.description): undefined;
    !sys.isNull(config.google_site_verification)? sc.addMeta("google-site-verification", config.google_site_verification): undefined;
    !sys.isNull(config.keywords)? sc.addMeta("keywords", config.keywords): undefined;
    !sys.isNull(config.page_topic)? sc.addMeta("page-topic", config.page_topic): undefined;
    !sys.isNull(config.publisher)? sc.addMeta("publisher", config.publisher): undefined;
    !sys.isNull(config.revisit_after)? sc.addMeta("revisit-after", config.revisit_after): undefined;
    !sys.isNull(config.robots)? sc.addMeta("robots", config.robots): undefined;
    !sys.isNull(config.viewport)? sc.addMeta("viewport", config.viewport): undefined;
    return sc;
}

function buildPage():Response{
    sc = new HTMLSourceCode();
    sc.addDoctype();
    let tag:HTMLElement = sc.openTag("html");
    tag.addStyle("height", "100%");
    tag.addStyle("width", "100%");
    sc.openTag("head");
    sc.addSourceCode(buildTitle());
    sc.addSourceCode(buildMeta());
    //sc.openTag("style");
    //sc.addContent("@font-face{font-family: \"Alessia\"; src: url(\"/Apalu.ttf\");}")
    //sc.closeTag("style");
    sc.closeTag("head");
    sc.addSourceCode(buildBody());
    sc.closeTag("html")
    return new Response(200, "text/html", sc.getHTML());
}

function buildTitle():HTMLSourceCode{
    let sc = new HTMLSourceCode();
    sc.openTag("title");
    sc.addContent(config.title)
    sc.closeTag("title");
    return sc;
}

function getContentType(path:string):string{
    let end = path.substr(path.lastIndexOf(".") + 1, path.length);
    for(let type of filetypes.types){
        if(end === type.name){
            return type.type;
        }
    }
    return undefined;
}

function getFile():Response{
    //let file:string = fs.readFileSync(uo.page);
    let slash:string;
    uo.page.substr(0, 1) === "/"? slash = "": slash="/";
    let path:string = "./lib/res" + slash + uo.page;
    return new Response(200, getContentType(path), fs.readFileSync(path));

    //TODO: All

}

export function response(req:Request):Response{
    uo = new URLObject(req.url);
    return route();
}

function route():Response{
    if(uo.isFile()){
        return getFile();
    }else{
        return buildPage();
    }
}