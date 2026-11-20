
import { supabase } from "./supabase.js";

const form = document.querySelector("#reset-password-form");
const newPassword = document.querySelector("#new-pass");
const confirmPassword = document.querySelector("#confirm-pass");
const message = document.querySelector("#form-message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const password = newPassword.value;
    const confirm = confirmPassword.value;

    // Check password requirements
    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!passwordPattern.test(password)) {
        message.textContent =
            "Password does not meet all the requirements.";
        return;
    }

    // Check whether passwords match
    if (password !== confirm) {
        message.textContent = "Passwords do not match.";
        return;
    }

    message.textContent = "Updating your password...";

    // Check recovery session
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
        message.textContent =
            "Invalid or expired reset link. Please request a new one.";
        return;
    }

    // Update password
    const { error } = await supabase.auth.updateUser({
        password: password
    });

    if (error) {
        console.error("Password update error:", error.message);
        message.textContent = error.message;
        return;
    }

    message.textContent =
        "Password updated successfully! You can now log in.";

    form.reset();
});
