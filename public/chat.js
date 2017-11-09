// the Dom

var usernameInput  = document.querySelector('.inputUsername');
var msgInput       = document.querySelector('.inputMessage');
var allMsg         = document.querySelector('.allMessages'); //this is an unordered list
var allFriends     = document.querySelector('.allFriends');
var friends        = document.querySelector('.friends');
var msg            = document.querySelector('.messages');
var login          = document.querySelector('.login');
var send           = document.querySelector('.send');

var socket          = io();

function setUsername() {
  socket.emit('set username', usernameInput.value);
  updateDomUser();
};

function sendMessage() {
  updateDomMsg({
    username: usernameInput.value,
    message: msgInput.value
  });
  socket.emit('new message', msgInput.value);
};

// DOM Functions

function updateDomUser() {
  var staticUser = document.createElement('span');
  staticUser.innerHTML = usernameInput.value;
  staticUser.setAttribute('class', 'staticUsername');
  var parent = document.querySelector('#loginInLine');
  usernameInput = parent.replaceChild(staticUser, usernameInput);
  parent.removeChild(login);
}

function updateDomMsg(data) {
  console.log(data);
  var message = document.createElement('li');
  message.innerHTML = `${data.username}: ${data.message} `;
  var parent = document.querySelector('.allMessages');
  message = parent.appendChild(message);
  msgInput.value = '';
};

function updateDomFriend() {
  return
};

// Event Listeners

login.addEventListener('click', setUsername);

send.addEventListener('click', sendMessage);

usernameInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {login.click()}
});
msgInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {send.click()}
});

// Socket Events

socket.on('new message', function(data) {
  updateDomMsg(data);
});

// add friends to chumroll
// change/update chumhandle [login functionality]
