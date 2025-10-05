const {Socket, Server} = require("socket.io");

let userCount = 0;

let rooms={};

const connectServer = (server)=>{
    const io = new Server(server,{
        cors:{
            origin:"*",
            methods:["GET","POST"]
        }
    });

    io.on("connection",(socket)=>{
        console.log(`User connected: ${socket.id}`);
        mySocketId = socket.id;
        socket.on("join:room",(room,peerId)=>{
            if(!rooms[room]){
                rooms[room] = [];
            }
            socket.join(room);
            if(peerId && rooms[room].length < 2){
            rooms[room].push({socketId:socket.id,peerId});
            }
            console.log("room length: ",rooms[room].length);
            if(rooms[room].length === 2){
                console.log(rooms[room]);
                let [user1, user2] = rooms[room];
                io.to(user1.socketId).emit("room:ready",user2.peerId);
                io.to(user2.socketId).emit("room:ready",user1.peerId);
            }

            console.log(`User with ID: ${socket.id} joined room: ${room}`);
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

        socket.on("leave:room",(room)=>{
            console.log(`User with ID: ${socket.id} left room: ${room}`);
            socket.leave(room);
            if(rooms[room]){
                rooms[room] = rooms[room].filter(user => user.socketId !== socket.id);
                if(rooms[room].length === 0){
                    delete rooms[room];
                }
            }
            socket.to(room).emit("user:left",socket.id);
        })

        socket.on("disconnect",()=>{
            console.log("User disconnected",socket.id);
            for(let room in rooms){
                rooms[room] = rooms[room].filter(user => user.socketId !== socket.id);
                if(rooms[room].length === 0){
                    delete rooms[room];
                }
            }
        });
    });
}
module.exports = connectServer;