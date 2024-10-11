const chatbox = document.getElementById('chatbox');
const messageInput = document.getElementById('messageInput');
const recipientInput = document.getElementById('recipientInput');
const sendButton = document.getElementById('sendButton');
const goToContacts = document.getElementById('goToContacts');

// Load messages from local storage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    chatbox.innerHTML = '';
    messages.forEach(message => {
        const div = document.createElement('div');
        div.className = 'message';
        div.innerHTML = `<span class="username">${message.sender}</span>: ${message.text}`;
        chatbox.insertBefore(div, chatbox.firstChild); // Add to top
    });
}

// Send a message
function sendMessage() {
    const messageText = messageInput.value;
    const recipient = recipientInput.value;

    const username = localStorage.getItem('username');
    if (messageText.trim() === '' || recipient.trim() === '' || !username) return;

    // Save message to local storage
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ sender: username, recipient: recipient.trim(), text: messageText.trim() });
    localStorage.setItem('messages', JSON.stringify(messages));

    messageInput.value = ''; // Clear input
    recipientInput.value = ''; // Clear recipient input
    loadMessages(); // Refresh messages
}

// Redirect to contacts page
goToContacts.addEventListener('click', () => {
    window.location.href = 'contacts.html';
});

// Set interval to reload messages every 5 seconds
setInterval(loadMessages, 5000);

// Attach event listener to send button
sendButton.addEventListener('click', sendMessage);

// Load messages on initial load
loadMessages();
