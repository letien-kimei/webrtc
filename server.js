const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
const clients = require('./src/class/clients')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('public/css'))
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})
app.get('/:room', (req, res) => {
  res.render('room', { roomId: 1 })
})

var mdClients = clients.clients
io.on('connection', socket => {
  mdClients.socket_id = socket.id
  mdClients.room = 1
  mdClients.addClients()  
  getClients = mdClients.getClients()

  // console.log(getClients)
  socket.on('join-room', (roomId, userId) => {
   
    socket.join(roomId)
    objClient = {
      userId: userId,
      socketId : socket.id
    }
    console.log("============ JOIN ROOM =============") 
    console.log(objClient)
    socket.broadcast.to(roomId).emit('user-connected', objClient)

    socket.on('disconnect', () => {
      socket.broadcast.to(roomId).emit('user-disconnected', objClient)
    })
  })
})

console.log('========== OK ================')

server.listen(3000)