'use strict';

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*'
}));
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

//
io.on("connection", (socket) => {
  console.log(`${socket.id} is connected`)
  socket.on('message', (payload) => {
    // console.log(payload)
    socket.broadcast.emit('getConvo', payload)
  })
  socket.on('login', (payload) => {
    console.log(`${payload.name} has login`)
    socket.broadcast.emit('userLogin', payload)
  })
  socket.on('logout', (payload) => {
    socket.broadcast.emit('userLogin', payload)
  })
  socket.on('chat', (payload) => {
    socket.broadcast.emit('chatFocus', payload)
  })
});
//

const port = 80

httpServer.listen(port, () => {
  console.log(`Listening to port ${port}`)
});