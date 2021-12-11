//Constants
const key_sid = "alessia_sid";
const socket = new WebSocket("ws://localhost:8080");

//Classes
class DataObject{
    //Declarations
    command:string;

    //Constructor
    constructor(command:string){
        this.command = command;
    }
}

//Listeners
socket.addEventListener("open", function(event){
    if(localStorage.getItem(key_sid) === null){
        send(new DataObject("getSID"));
    }else{
        let data = new DataObject("checkSID");
        data["sid"] = getSID();
        send(data);
    }
});

socket.addEventListener("message", function(event){
    execute(event.data)
});

//Functions
function execute(jsonObject:string):void{
    let data = JSON.parse(jsonObject);
    switch(data.command){
        case "alert":
            alert(data.content);
            break;
        case "setAdminPanel":
            setAdminPanel(data.content);
            break;
        case "setSID":
            localStorage.setItem(key_sid, data.sid);
            loadPage("index");
            break;
    }
}

function getSID():string{
    return localStorage.getItem(key_sid)
}

function loadPage(page:string):void{
    let data = new DataObject("loadPage");
    data["sid"] = getSID();
    data["page"] = page;
    send(data);
}

function loadPanel(panel:string):void{
    let data = new DataObject("loadPanel");
    data["sid"] = getSID();
    data["panel"] = panel;
    send(data);
}

function logout(){
    alert("LOGOUT");
    let data = new DataObject("logout");
    data["sid"] = getSID();
    send(data);
}

function send(data){
    socket.send(JSON.stringify(data));
}

function setAdminPanel(content:string):void{
    document.getElementById("alessia_div_admin_panel").innerHTML = content;
}