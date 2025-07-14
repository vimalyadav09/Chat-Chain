// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

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

// Auto-redirect if user already logged in
const existingUser = localStorage.getItem("name");
const existingEmail = localStorage.getItem("email");

if (existingUser && existingEmail) {
  window.location.href = "main.html";
}

// DOM elements
const button = document.querySelector(".next");
const user = document.querySelector(".name");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const signin = document.querySelector(".signbutton");
const loginBtn = document.getElementById("loginbtn");
const loginBtn1 = document.getElementById("para")

loginBtn.addEventListener('click',()=>{
    window.location.href="login.html"
})

loginBtn1.addEventListener('click',()=>{
    window.location.href="login.html"
})

let userName = "";

button.addEventListener('click', () => {
    const name = user.value.trim();
    if (name !== "") {
        userName = name;
        localStorage.setItem("name", userName);
        document.getElementById("form").style.display = "none";
        document.getElementById("form2").style.display = "flex";
    } else {
        alert("Please Enter Your Name");
    }
});

if (!localStorage.getItem("theme")) {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add("dark-mode");
  }
}



signin.addEventListener('click', () => {
    const userEmail = email.value.trim();
    const userPass = password.value.trim();

    if (userEmail !== "" && userPass !== "") {
        localStorage.setItem("email", userEmail);


        set(ref(db, "users/" + userName), {
            name: userName,
            email: userEmail,
            password: userPass
        })
        .then(() => {
            alert("User registered successfully!");
            window.location.href = "main.html"; 
        })
        .catch(error => {
            console.error("Error saving user:", error);
            alert("Failed to register. Try again.");
        });
    } else {
        alert("Please enter both email and password.");
    }
});
