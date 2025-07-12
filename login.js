import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCv6mni62EwRIzGRuuuSjFWkYfKwiqyK2Q",
  authDomain: "chatchain-ca3c1.firebaseapp.com",
  databaseURL: "https://chatchain-ca3c1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatchain-ca3c1",
  storageBucket: "chatchain-ca3c1.appspot.com",
  messagingSenderId: "715214567891",
  appId: "1:715214567891:web:985c9e6a5f4bbff72a1726"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM elements
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const signBtn = document.getElementById("signbtn");
const signBtn1 = document.getElementById("para");

signBtn.addEventListener('click',()=>{
    window.location.href="signin.html"
})

signBtn1.addEventListener('click',()=>{
    window.location.href="signin.html"
})

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  const userRef = ref(db);
  try {
    const snapshot = await get(child(userRef, `users/${username}`));
    if (!snapshot.exists()) {
      alert("User does not exist");
      return;
    }

    const userData = snapshot.val();
    if (userData.password === password) {
      // Store in localStorage
      localStorage.setItem("name", userData.name);
      localStorage.setItem("email", userData.email);
      window.location.href = "main.html";
    } else {
      alert("Incorrect password");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Please try again.");
  }
});
