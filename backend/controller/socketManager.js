const {Socket, Server} = require("socket.io");

let userCount = 0;

const connectServer = (server)=>{
    const io = new Server(server,{
        cors:{
            origin:"*",
            methods:["GET","POST"]
        }
    });

    io.on("connection",(socket)=>{
        console.log(`User connected: ${socket.id}`);

        socket.on("join:room",(room)=>{
            socket.join(room);
            console.log(`User with ID: ${socket.id} joined room: ${room}`);
            userCount++;
            socket.to(room).emit("room:joined",{room,socketId:socket.id});
        });
        socket.on("check:ready",(room)=>{
            if(userCount >=2){
                console.log("Emitting ready event to room");
                io.to(room).emit("ready");
            }
        })

        socket.on("send:message",(data,room)=>{
            socket.to(room).emit("receive_message",data);
        });

        socket.on("disconnect",()=>{
            console.log("User disconnected",socket.id);
        });
    });
}
module.exports = connectServer;