'use strict';

const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*"
  }
});

const PORT = process.env.PORT || 80;

http.listen(PORT, function() {
  console.log("Socket IO started")
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
})