const express = require("express");
const socketio = require("socket.io");
const app = express();

var users = [];

var mssgs = [];

app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port")/*,"192.168.0.7"*/, ()=>{
    console.log("inicio");
});
app.use(express.static("ChatLocal"));

const IO = socketio(server);

IO.on("connection",(socket)=>{
    console.log(socket.id +" conectado");

    socket.on("chat:CreateUser",(name)=>{
        users.push(name);
        IO.sockets.emit("chat:NewUser", users);
    });

    socket.on("chat:SendMessage",(m)=>{
        mssgs.push(m);
        IO.sockets.emit("chat:NewMessage", mssgs);
    });
});

