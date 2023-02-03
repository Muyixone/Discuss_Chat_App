const chatForm = document.getElementById('chat-form');

const socket = io();

socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);
});

// Message submit
chatForm.addEventListener('submit', (event) => {
  // prevent the form from submitting to a file automatically
  event.preventDefault();

  // Get message text from the form input
  const msg = event.target.elements.msg.value;

  // Emit the message to server
  socket.emit('chatMessage', msg);
});
