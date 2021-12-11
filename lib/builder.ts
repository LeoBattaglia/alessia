//Imports
import * as func from "./html_functions";
import {Response} from "selina";
import {URLObject} from "./urlObject";

//Constants
const fs = require("fs");

//Functions
function getFile(uo:URLObject):Response{
    //console.log("FFF: " + uo.url)
    let path:string;
    if(uo.url === "/fontawesome.js"){
        path = "./node_modules/@fortawesome/fontawesome-free/js/all.js";
    }else{
        let type:string = uo.getFileType();
        path = "./lib/res/";
        switch(type){
            case "css":
                path += "styles/";
                break;
            case "ico":
                path += "icons/";
                break;
            case "jpg":
                path += "images/";
                break;
            case "js":
                path += "scripts/";
                break;
            case "pdf":
                path += "files/";
                break;
            case "png":
                path += "images/";
                break;
            case "svg":
                path += "images/";
                break;
            case "ttf":
                path += "fonts/";
                break;
        }
        path += uo.getTargetFile();
    }
    if(fs.existsSync(path)){
        return new Response(200, uo.getContentType(), fs.readFileSync(path));
    }
}

export function response(req:Request):Response{
    let uo:URLObject = new URLObject(req.url);
    return route(uo);
}

function route(uo:URLObject):Response{
    if(uo.isFile()){
        return getFile(uo);
    }else{
        return func.createPage(uo);
    }
}