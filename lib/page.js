//Constants
const key_sid = "alessia_sid";
const socket = new WebSocket("ws://localhost:8080");
//Listeners
socket.addEventListener("open", function (event) {
    if (localStorage.getItem(key_sid) === null) {
        let data = {
            command: "getSID"
        };
        socket.send(JSON.stringify(data));
    }
    else {
        let data = {
            command: "checkSID",
            sid: localStorage.getItem(key_sid)
        };
        socket.send(JSON.stringify(data));
    }
});
socket.addEventListener("message", function (event) {
    execute(event.data);
});
//Functions
function execute(jsonObject) {
    let data = JSON.parse(jsonObject);
    switch (data.command) {
        case "alert":
            alert(data.content);
            break;
        case "setAdminPanel":
            setAdminPanel(data.content);
            break;
        case "setSID":
            localStorage.setItem(key_sid, data.sid);
            break;
    }
}
function log_in() {
    let data = {
        command: "login",
        sid: localStorage.getItem(key_sid),
        username: document.getElementById("alessia_username")["value"],
        password: document.getElementById("alessia_password")["value"]
    };
    socket.send(JSON.stringify(data));
}
function setAdminPanel(content) {
    document.getElementById("alessia_div_admin_panel").innerHTML = content;
}
//# sourceMappingURL=page.js.map