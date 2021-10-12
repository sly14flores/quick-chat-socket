const { createServer } = require("https");
const { Server } = require("socket.io");
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

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

httpServer.listen(80, () => {
  console.log("Socket is live")
});