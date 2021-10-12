'use strict';

const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 80;
// const INDEX = '/index.html';

const server = express()
  // .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .use(cors({
    origin: 'https://quick-chat-fe.herokuapp.com'
  }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

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