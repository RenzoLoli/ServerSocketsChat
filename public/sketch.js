const socket = io();
var intro = prompt("nombre");
var usersPanel = document.getElementById("chat-users-panel");
var nickname = document.getElementById("chat-nickname");
nickname.innerHTML = intro;
var chatPanel = document.getElementById("chat-area");
var btnSend = document.getElementById("chat-button-send");
var chatMssg = document.getElementById("chat-mssg");
var btnLogin = document.getElementById("chat-button-send-login");

function CreateMssg(mssg){
    let msgSend = "";
    for (let i = 1; i < mssg.length+1; i++) {
        if(i%67 == 0){
            msgSend += "\n";
        }
        msgSend += mssg[i-1];
        
    }
    return msgSend;
}

btnSend.addEventListener("click",()=>{

    socket.emit("chat:SendMessage",chatMssg.value);
    
    /*if(chatMssg.value != null && chatMssg.value != ""){
        chatPanel.innerHTML += "<div class='chat-user-mssg-content'><p class='chat-user-nickname'>"+nickname.textContent+"</p><p class='chat-user-mssg'>" + CreateMssg(chatMssg.value) + "</p></div>";
    }
    //usersPanel.innerHTML += "<p class='chat-user-newUser'>" + msgSend + "</p>";
    
    chatPanel.scrollTop = chatPanel.scrollHeight;
    //usersPanel.scrollTop = chatPanel.scrollHeight;*/
    chatMssg.value = "";
});

btnLogin.addEventListener("click",()=>{
    
    let userId = document.getElementById("user-id");
    let userPassword = document.getElementById("user-password");

    console.log(userId);
    nickname.innerHTML = userId.value;

});

socket.emit("chat:CreateUser",nickname.textContent);

socket.on("chat:NewUser",(users)=>{
    usersPanel.innerHTML = "";
    for (let u = 0; u < users.length; u++) {
        usersPanel.innerHTML += "<p class='chat-user-newUser'>" + users[u] + "</p>";  
    }
    usersPanel.scrollTop = chatPanel.scrollHeight;
});

socket.on("chat:NewMessage",(mssgs)=>{
    chatPanel.innerHTML = "";
    for (let m = 0; m < mssgs.length; m++) {
        chatPanel.innerHTML += "<div class='chat-user-mssg-content'><p class='chat-user-nickname'>"+nickname.textContent+"</p><p class='chat-user-mssg'>" + CreateMssg(mssgs[m]) + "</p></div>";  
    }
    chatPanel.scrollTop = chatPanel.scrollHeight;
});