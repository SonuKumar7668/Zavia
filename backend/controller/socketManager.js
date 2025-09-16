const {Socket, Server} = require("socket.io");

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
            console.log(`User with ID: ${socket.id} joined room`);
        });

        socket.on("send:message",(data,room)=>{
            socket.to(room).emit("receive_message",data);
        });

        socket.on("disconnect",()=>{
            console.log("User disconnected",socket.id);
        });
    });
}
module.exports = connectServer;