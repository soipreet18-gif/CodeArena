
import { supabase } from "./supabase.js";

async function checkUser() {

    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        window.location.href = "login.html";
        return;
    }

    const user = data.user;

const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, total_points")
    .eq("id", user.id)
    .single();

if (profileError) {
    console.error("Profile fetch error:", profileError.message);
} else {
    console.log("User profile:", profile);

    // Display actual points from Supabase
    const pointsElement = document.querySelector("#total-points");

    if (pointsElement) {
        pointsElement.textContent = profile.total_points ?? 0;
    }
}


const { data: solvedChallenges, error: challengesError } = await supabase
    .from("challenge_submissions")
    .select("challenge_id")
    .eq("user_id", user.id)
    .eq("status", "solved");

if (challengesError) {
    console.error("Solved challenges error:", challengesError.message);
} else {
    // Count unique solved challenges
    const uniqueSolved = new Set(
        solvedChallenges.map(challenge => challenge.challenge_id)
    ).size;

    console.log("Solved challenges:", uniqueSolved);

    // Display the count on dashboard
    const solvedElement = document.querySelector("#solved-count");

    if (solvedElement) {
        solvedElement.textContent = uniqueSolved;
    }
}


    console.log("Logged-in user:", user);
    const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Developer";
    const welcomeName = document.querySelector(".upper-section h2 span");
    if (welcomeName) {
    welcomeName.textContent = `${displayName}! 👋👋`;
    const logoutButton = document.querySelector("#logout-btn");

logoutButton.addEventListener("click", async () => {

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Logout failed:", error.message);
        return;
    }

    window.location.href = "login.html";

});
}
}

checkUser();