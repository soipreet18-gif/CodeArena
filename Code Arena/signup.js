
import { supabase } from "./supabase.js";

// Get the signup form
const signupForm = document.querySelector(".signup-form form");

// Get all input fields
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

// Get the signup button
const signupButton = document.querySelector(".signup-button");

// Create a message area
const message = document.createElement("p");
message.id = "signup-message";
message.style.marginTop = "15px";
message.style.textAlign = "center";
message.style.fontSize = "14px";

// Insert message after the form
signupForm.insertAdjacentElement("afterend", message);

// Function to display messages
function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

// Handle signup form submission
signupForm.addEventListener("submit", async function (event) {

    // Prevent page reload
    event.preventDefault();

    // Get input values
    const fullName = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Check empty fields
    if (!fullName || !email || !password || !confirmPassword) {
        showMessage("Please fill in all fields.", "#ff6b6b");
        return;
    }

    // Check password match
    if (password !== confirmPassword) {
        showMessage("Passwords do not match.", "#ff6b6b");
        return;
    }

    // Check password length
    if (password.length < 8) {
        showMessage("Password must be at least 8 characters.", "#ff6b6b");
        return;
    }

    // Disable button during signup
    signupButton.disabled = true;
    signupButton.value = "Creating account...";

    showMessage("Creating your account...", "#A56AFF");

    try {

        // Send signup request to Supabase
        const { data, error } = await supabase.auth.signUp({

            email: email,
            password: password,

            options: {
                data: {
                    full_name: fullName
                }
            }

        });

        // Handle Supabase errors
        if (error) {
            throw error;
        }

        // Account created
        showMessage(
            "Account created! Please check your email to verify your account.",
            "#7CFFB2"
        );

        // Clear form
        signupForm.reset();

    } catch (error) {

        // Display error
        showMessage(error.message, "#ff6b6b");

    } finally {

        // Enable button again
        signupButton.disabled = false;
        signupButton.value = "Sign up";

    }

});
