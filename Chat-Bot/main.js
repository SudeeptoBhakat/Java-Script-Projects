document.addEventListener("DOMContentLoaded", function () {
    const themeSwitch = document.getElementById("themeSwitch");
    const body = document.body;

    // Load the saved theme from localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeSwitch.checked = true;
    }

    themeSwitch.addEventListener("change", function () {
        if (themeSwitch.checked) {
            body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    });
});

// Replace this with your Wit.ai Server Access Token
const accessToken = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

document.getElementById('sendBtn').addEventListener('click', function() {
    sendMessage();
});

// Add keydown event listener for the message input
document.getElementById('messageInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default behavior of the Enter key
        sendMessage(); // Call the sendMessage function
    }
});

function sendMessage() {
    // Get the user's input
    const messageInput = document.getElementById('messageInput').value;

    // Check if the input is not empty
    if (messageInput.trim() !== '') {
        // Add user's message to the chat window
        addMessageToChat('User', messageInput);

        // Send the input to Wit.ai and get the response
        sendMessageToWitAI(messageInput);

        // Clear the input field after sending
        document.getElementById('messageInput').value = '';
    }
}

function sendMessageToWitAI(message) {
    // Send a GET request to Wit.ai's message API
    fetch(`https://api.wit.ai/message?v=20210928&q=${encodeURIComponent(message)}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // Process Wit.ai's response and get the text
        const botResponse = processWitAIResponse(data);

        // Display the bot's response in the chat window
        addMessageToChat('Bot', botResponse);
    })
    .catch(error => {
        console.error('Error:', error);
        addMessageToChat('Bot', 'Sorry, something went wrong!');
    });
}

function processWitAIResponse(data) {
    // Process the response from Wit.ai to extract relevant information
    // Here, we're just displaying the intent and text message for simplicity
    if (data && data.intents && data.intents.length > 0) {
        const intent = data.intents[0].name;
        const message = data.text;
        return `${intent}`;
    } else {
        return 'Sorry, I didn’t understand that.';
    }
}

function addMessageToChat(sender, message) {
    // Create a new message div
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'User' ? 'user-msg' : 'bot-msg');
    messageDiv.innerHTML = `${message}`;

    // Add the message div to the chat window
    document.getElementById('chatWindow').appendChild(messageDiv);

    // Scroll to the bottom of the chat window
    document.getElementById('chatWindow').scrollTop = document.getElementById('chatWindow').scrollHeight;
}
