
// ⭐ REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT URL ⭐
const SCRIPT_URL_LOGIN = "https://script.google.com/macros/s/AKfycbwL2MChkj6BZjm-e92PYBiWSoKyDLTz6TJO40k_wQqXSNyr0AiDlquojInDaYffTWG7/exec"; 

// Show message function
function showMsg(text, type) {
    const msgElement = document.getElementById("msg");
    if (msgElement) {
        msgElement.innerHTML = `<div class="msg ${type}">${text}</div>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            const body = new URLSearchParams({ email, password, action: "login" }).toString();

            try {
                const res = await fetch(SCRIPT_URL_LOGIN, {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body
                });

                const result = await res.json();

                if (result.status === "success") {

                    // Save student email for dashboard
                    localStorage.setItem("studentEmail", email.trim().toLowerCase());

                    showMsg("Login successful! Redirecting...", "success");

                    setTimeout(() => {
                        window.location.href = "Student dashboard.html";
                    }, 1200);

                } else {
                    showMsg("Invalid email or password!", "error");
                }

            } catch (error) {
                console.error("Login Network Error:", error);
                showMsg("Network error!", "error");
            }
        });
    }
});






// const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwHQDhJ0WUYot_jdi7CH-9Fw0uIcutfp182qf1FBfwYP-8SzMFl_A3p0DSN3CI2YzmO/exec";

// // show message
// function showMsg(text, type) {
//   document.getElementById("msg").innerHTML =
//     `<div class="msg ${type}">${text}</div>`;
// }

// document.getElementById("loginForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();

//   const body = new URLSearchParams({ email, password, action: "login" }).toString();

//   try {
//     const res = await fetch(SCRIPT_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body
//     });

//     const result = await res.json();

//     if (result.status === "success") {

//        // Save student email for dashboard
//       localStorage.setItem("studentEmail", email);

//       showMsg("Login successful! Redirecting...", "success");

//       setTimeout(() => {
//         window.location.href = "Student dashboard.html";
//       }, 1200);

//     } else {
//       showMsg("Invalid email or password!", "error");
//     }

//   } catch (error) {
//     showMsg("Network error!", "error");
//   }
// });
