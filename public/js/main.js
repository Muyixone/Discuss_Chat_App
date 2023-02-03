const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// GET username and room from the URL
const { username, room } = qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join Chat room
socket.emit('joinRoom', { username, room });

// Recieves a message from the server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (event) => {
  // prevent the form from submitting to a file automatically
  event.preventDefault();

  // Get message text from the form input field in the form
  const msg = event.target.elements.msg.value;

  // Emit the message to server
  socket.emit('chatMessage', msg);

  // Clear input message field after message has been sent
  event.target.elements.msg.value = '';
  event.target.elements.msg.focus();
});

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}
