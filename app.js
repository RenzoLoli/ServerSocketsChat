const express = require("express");
const socketio = require("socket.io");
const app = express();

var users = [];

var mssgs = [];

const server = app.listen(3000/*,"192.168.0.7"*/, ()=>{
    console.log("inicio");
});
app.use(express.static("../ChatLocal"));

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
