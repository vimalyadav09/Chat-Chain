// Firebase imports (MODULAR SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, set, get, push,onChildAdded} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

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
const notification = document.getElementById("Notification")

if (username && usermail) {
    if (usernameDiv) usernameDiv.textContent = username;
    if (usermailDiv) usermailDiv.textContent = usermail;
}else {
  window.location.href = "index.html"; 
}


const messagesRef = ref(db, "messages");
messagesDiv.innerHTML = ""; 

onChildAdded(messagesRef, (snapshot) => {
    const msg = snapshot.val();
    const msgElement = document.createElement("div");
    msgElement.className = "message " + (msg.sender === username ? "my-message" : "other-message");

    msgElement.innerHTML = `
        <strong>${msg.sender}</strong>
        <p>${msg.text}</p>
        <span style="font-size: 12px; color: gray;">${msg.time || "Unknown time"}</span>
    `;
    messagesDiv.prepend(msgElement); 
    if (!document.hasFocus() && msg.sender !== username && Notification.permission === "granted") {
        new Notification(`New message from ${msg.sender}`, {
            body: msg.text,
            icon: "Logo2.png"
        });
    }
});

notification.addEventListener('click',()=>{
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
            }
        });
}

})

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
                messageInput.value = "";
            })
            .catch(err => {
                console.error("Error sending message:", err);
            });
    });
}

const toggleBtn = document.getElementById("toggleTheme");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    document.getElementById("sun").style.display="flex"
    document.getElementById("moon").style.display="none"
    document.getElementById("ThemeId").textContent="Light Theme"
  } else {
    localStorage.setItem("theme", "light");
    document.getElementById("moon").style.display="flex"
    document.getElementById("sun").style.display="none"
    document.getElementById("ThemeId").textContent="Dark Theme"
  }
});

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
    window.location.href = "index.html";
});

// Handle mobile keyboard push-up space
let originalHeight = window.innerHeight;
window.addEventListener("resize", () => {
    const newHeight = window.innerHeight;
    const bottomContainer = document.querySelector(".bottom-container");
    if (!bottomContainer) return;

    if (newHeight < originalHeight) {
        // Keyboard is open
        bottomContainer.style.paddingBottom = "300px";
    } else {
        // Keyboard is closed
        bottomContainer.style.paddingBottom = "0px";
    }
});
