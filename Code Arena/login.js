
import { supabase } from "./supabase.js";

// Get the HTML elements
const loginForm = document.querySelector(".login-content form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = loginForm.querySelector('button[type="submit"]');

// Create a message area
const message = document.createElement("p");
message.id = "login-message";
message.style.textAlign = "center";
message.style.marginTop = "15px";
message.style.fontSize = "14px";

loginForm.insertAdjacentElement("afterend", message);

// Function to display messages
function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

// Handle login form submission
loginForm.addEventListener("submit", async function (event) {

    // Stop the page from refreshing
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Check empty fields
    if (!email || !password) {
        showMessage("Please enter your email and password.", "#ff6b6b");
        return;
    }

    loginButton.disabled = true;
    loginButton.textContent = "Logging in...";

    showMessage("Checking your account...", "#A56AFF");

    try {
        // Authenticate using Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            throw error;
        }

        if (!data.session) {
            showMessage("Login could not be completed. Please try again.", "#ff6b6b");
            return;
        }

        showMessage("Login successful! Redirecting...", "#7CFFB2");

        // Redirect to dashboard
        window.location.href = "dashboard.html";

    } catch (error) {

        if (error.message === "Email not confirmed") {
            showMessage("Please verify your email before logging in.", "#ff6b6b");
        } else {
            showMessage(error.message, "#ff6b6b");
        }

    } finally {
        loginButton.disabled = false;
        loginButton.textContent = "Login";
    }
});
