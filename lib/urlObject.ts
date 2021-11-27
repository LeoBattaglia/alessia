import  * as filetypes from "./res/filetypes.json"
import * as sys from "samara";

//Classes
export class URLObject{
    //Declarations
    _page:string;
    _paras:string[];
    _url:string;

    //Constructor
    constructor(url){
        this.page = "";
        this.paras = [];
        this.url = url;
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
            return false;
        }
    }

    cutURL():void{
        if(this.url.indexOf("?") < 0){
            this.page = this.url;
        }else{
            this.page = this.url.substr(0, this.url.indexOf("?"));
            let paras:string = this.url.substr(this.url.indexOf("?") + 1, this.url.length);
            if(paras.indexOf("&") < 0){
                this.paras = [paras];
            }else{
                this.paras = paras.split("&");
            }
        }
        //console.log("RRR: " + this.page);
    }

    isCSS():Boolean{
        if(this.page.indexOf(".css") === this.page.length - ".css".length){
            return true;
        }
        return false;
    }

    isFile():Boolean{
        for(let type of filetypes.types){
            if(this.page.indexOf("." + type.name) === this.page.length - type.name.length - 1){
                return true;
            }
        }
        return false;
    }

    //Get-Methods
    get page():string{
        return this._page;
    }

    get paras():string[]{
        return this._paras;
    }

    get url():string{
        return this._url;
    }

    //Set-Methods
    set page(value:string){
        this._page = value;
    }

    set paras(values:string[]){
        this._paras = values;
    }

    set url(value:string){
        this._url = value;
    }
}