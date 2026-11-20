
import { supabase } from "./supabase.js";

const emailInput = document.querySelector("#email");
const resetButton = document.querySelector("#reset-password");
const resetLink = document.querySelector("#reset");
const message = document.querySelector("#form-message");

resetLink.addEventListener("click", (event) => {
    event.preventDefault();
});

resetButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
        message.textContent = "Please enter your email address.";
        return;
    }

    message.textContent = "Sending reset link...";

    const { error } = await supabase.auth.resetPasswordForEmail(
        email,
        {
            redirectTo: "https://codearenapreet.netlify.app/reset-password.html"
        }
    );

    if (error) {
        console.error(error.message);
        message.textContent = error.message;
        return;
    }

    message.textContent =
        "If an account exists for this email, a reset link will be sent.";
});
