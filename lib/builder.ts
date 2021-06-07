//Constants
const urlObject = require("./urlObject");

//Declarations
let uo;

//Functions
function getEmptyPage():HTMLCode{
    let src:HTMLCode = new HTMLCode();
    src.add("<!DOCTYPE html>");
    src.add("<html>");
    src.add("<head>");
    src.add("<title>Alessia-Framework</title>");
    src.add("</head>");
    src.add("<body>");
    src.add("</body>");
    src.add("</html>");
    return src;
}
function loadPage(page:string):string{
    let src:HTMLCode = getEmptyPage();


    //TODO: All

    return src.src;
}
export function response(req:Request):string{
    let res:string = "";
    uo = new urlObject.URLObject(req.url);
    res += loadPage(uo.page);

    //TODO: Display Editor

    return res;
}

//Classes
class HTMLCode{
    //Declarations
    _src;

    //Constructor
    constructor(){
        this.src = "";
    }

    //Functions
    add(value:string):void{
        this.src += value + "\n";
    }
    get src():string{
        return this._src;
    }
    set src(value:string){
        this._src = value;
    }
}