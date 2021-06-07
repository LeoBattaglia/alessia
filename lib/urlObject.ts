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

    //Functions
    cutURL(){
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
    }

    get page():string{
        return this._page;
    }

    get paras():string[]{
        return this._paras;
    }

    get url():string{
        return this._url;
    }

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