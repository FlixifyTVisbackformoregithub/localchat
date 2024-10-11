const contactsDiv = document.getElementById('contacts');
const usernameInput = document.getElementById('usernameInput');
const registerButton = document.getElementById('registerButton');
const inbox = document.getElementById('inbox');

// Check if username is taken
function isUsernameTaken(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.includes(username);
}

// Register username
registerButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username === '' || isUsernameTaken(username)) {
        alert('Username is either empty or taken. Please choose another one.');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(username);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('username', username);
    
    alert(`Welcome, ${username}! You can now send messages.`);
    displayContacts(); // Refresh contact display
});

// Display users
function displayContacts() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    contactsDiv.innerHTML = '<strong>Available contacts:</strong><br>' + users.map(user => user).join('<br>');
    loadInbox();
}

// Load inbox messages
function loadInbox() {
    const username = localStorage.getItem('username');
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    
    inbox.innerHTML = '';
    messages.forEach(message => {
        if (message.recipient === username) {
            const div = document.createElement('div');
            div.innerHTML = `<strong>From: ${message.sender}</strong><br>${message.text}<br><hr>`;
            inbox.appendChild(div);
        }
    });
}

// Load contacts on page load
displayContacts();
