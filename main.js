// Firebase imports (MODULAR SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, set, get, push } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCv6mni62EwRIzGRuuuSjFWkYfKwiqyK2Q",
    authDomain: "chatchain-ca3c1.firebaseapp.com",
    databaseURL: "https://chatchain-ca3c1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chatchain-ca3c1",
    storageBucket: "chatchain-ca3c1.appspot.com",
    messagingSenderId: "715214567891",
    appId: "1:715214567891:web:985c9e6a5f4bbff72a1726",
    measurementId: "G-YYHQBNQWEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Get user data from localStorage
const username = localStorage.getItem("name");
const usermail = localStorage.getItem("email");

// DOM elements
const messageInput = document.querySelector(".messageinput");
const messagesDiv = document.querySelector(".messages");
const sendBtn = document.getElementById("send");
const usernameDiv = document.getElementById("username");
const usermailDiv = document.getElementById("usermail");

// Display user info
if (username && usermail) {
    if (usernameDiv) usernameDiv.textContent = username;
    if (usermailDiv) usermailDiv.textContent = usermail;
}

// Send message
if (sendBtn) {
    sendBtn.addEventListener("click", () => {
        const text = messageInput?.value.trim();
        if (!text || !username) {
            alert("Message is empty or user not found.");
            return;
        }

        const newMessage = {
            sender: username,
            text: text,
            time: new Date().toLocaleString()
        };

        const messagesRef = ref(db, `messages`);
        push(messagesRef, newMessage)
            .then(() => {
                const msgElement = document.createElement("div");
                msgElement.className = msg.sender === username ? "message my-message" : "message other-message";
                msgElement.innerHTML = `<strong>${newMessage.sender}</strong>
                    <p>${newMessage.text}</p>
                    <span style="font-size: 12px; color: gray;">${newMessage.time}</span>`;
                messagesDiv.prepend(msgElement);
                messageInput.value = "";
            })
            .catch(err => {
                console.error("Error sending message:", err);
            });
    });
}

// Load all messages from /messages (global)
const messagesRef = ref(db, 'messages');

get(messagesRef)
    .then(snapshot => {
        const data = snapshot.val();
        if (data) {
            Object.values(data).forEach(msg => {
                const msgElement = document.createElement("div");
                msgElement.className = msg.sender === username ? "message my-message" : "message other-message";
                msgElement.innerHTML = `<strong>${msg.sender}</strong>
                    <p>${msg.text}</p>
                    <span style="font-size: 12px; color: gray;">${msg.time || "Unknown time"}</span>`;
                messagesDiv.prepend(msgElement);
            });
        } else {
            messagesDiv.innerHTML = `<div class="empty-msg"><p>No messages found</p></div>`;
        }
    })
    .catch(err => {
        console.error("Error fetching messages:", err);
    });

// Mobile menu toggle
document.getElementById("bar")?.addEventListener("click", () => {
    document.getElementById("left").style.display = "none";
    document.getElementById("right").style.display = "flex";
});

document.getElementById("cancel")?.addEventListener("click", () => {
    document.getElementById("right").style.display = "none";
    document.getElementById("left").style.display = "flex";
});

// Logout
document.getElementById("logout")?.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "signin.html";
});
