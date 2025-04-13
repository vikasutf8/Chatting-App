const express = require('express');
const { createServer } = require('node:http');
const { Server } = require("socket.io");
const cors =require('cors');




const app = express();
app.use(cors())
const server = createServer(app);
//middlewares


const io = new Server(server,{
    cors:{origin:"*"}
});


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});


io.on('connection',(S)=>{
    console.log(`a socket create id: ${S.id}`)
    //TODO2 : listen frotend coming event
    S.on("joined",(e)=>{
        console.log(`this joined successfully : ${e}`)
    })
    S.on("chat",(data)=>{
        console.log("chat is herer ::"+data)
        io.emit("chat-received",data)
    })
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});