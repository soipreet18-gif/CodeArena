
import { supabase } from "./supabase.js";

async function checkUser() {

    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        window.location.href = "login.html";
        return;
    }

    const user = data.user;

    console.log("Logged-in user:", user);

}

checkUser();
