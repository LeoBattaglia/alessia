//Imports
import  * as filetypes from "./res/filetypes.json"
import * as sys from "samara";

//Classes
export class URLObject{
    //Declarations
    _paras:string[];
    _target:string;
    _url:string;

    //Constructor
    constructor(url){
        this.paras = [];
        this.target = "";
        this.url = url.trim().toLowerCase();
        this.cutURL();
    }

    //Methods
    containsPara(para:string, value:string):Boolean{
        for(let line of this.paras){
            if(line.indexOf("=") > -1){
                if(line.indexOf("=") > 0){
                    let paras:string[] = line.split("=");
                    if(sys.isNull(value)){
                        if(para === paras[0]){
                            return true;
                        }
                    }else{
                        if(para === paras[0] && value === paras[1]){
                            return true;
                        }
                    }
                }
            }else{
                if(para === line){
                    return true;
                }
            }
        }
        return false;
    }

    cutURL():void{
        if(this.url.indexOf("?") < 0){
            this.target = this.url;
        }else{
            this.target = this.url.substring(0, this.url.indexOf("?"));
            let paras:string = this.url.substring(this.url.indexOf("?") + 1, this.url.length);
            if(paras.indexOf("&") < 0){
                this.paras = [paras];
            }else{
                this.paras = paras.split("&");
            }
        }
        //console.log("RRR: " + this.page);
    }

    getContentType():string{
        let end = this.target.substring(this.target.lastIndexOf(".") + 1, this.target.length);
        for(let type of filetypes.types){
            if(end === type.name){
                return type.type;
            }
        }
        return undefined;
    }

    getFileType():string{
        return this.target.substring(this.target.indexOf(".") + 1, this.target.length);
    }

    getTargetFile():string{
        let file = this.target;
        while(file.indexOf("/") > -1){
            file = file.substring(file.indexOf("/") + 1, file.length);
        }
        return file;
    }

    isFile():Boolean{
        for(let type of filetypes.types){
            if(this.target.indexOf("." + type.name) === this.target.length - type.name.length - 1){
                return true;
            }
        }
        return false;
    }

    //Get-Methods
    get paras():string[]{
        return this._paras;
    }

    get target():string{
        return this._target;
    }

    get url():string{
        return this._url;
    }

    //Set-Methods
    set paras(values:string[]){
        this._paras = values;
    }

    set target(value:string){
        this._target = value;
    }

    set url(value:string){
        this._url = value;
    }
}