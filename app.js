const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

//ROUTES
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const chatRoomRouter = require('./routes/chatRoom');
const deleteRouter = require('./routes/delete');

//MDDLEWARE
// const authenticationMiddleware = require('./middleware/jwt');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const Adminmessage = 'Admin';

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// Runs when client connects
// This function will send a message from the server to the frontend
io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    // Welcomes current user
    socket.emit('message', formatMessage(Adminmessage, 'Welcome to Discuss'));

    // Broadcast when a user connects
    // Sends a message to other users except the current  user
    socket.broadcast.emit(
      'message',
      formatMessage(Adminmessage, 'A user has joined the chat')
    );
  });

  // Listen for chatMessage
  // It listens to an event made from the frontend
  socket.on('chatMessage', (msg) => {
    //send messsage to other users
    io.emit('message', formatMessage('USER', msg));
  });

  // Runs when a client disconnects
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(Adminmessage, 'A user has left the chat'));
  });
});

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/', indexRouter);
// app.use('/users', userRouter);
// app.use('/room', chatRoomRouter);
// app.use('/delete', deleteRouter);

// ERROR HANDLER
app.use('*', (req, res, next) => {
  return res.status(404).json({
    sucess: false,
    message: 'End point does not exist',
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
