
// ⭐ REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT URL ⭐
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwL2MChkj6BZjm-e92PYBiWSoKyDLTz6TJO40k_wQqXSNyr0AiDlquojInDaYffTWG7/exec"; 

function showMsg(text, type) {
  const msgElement = document.getElementById("msg");
  if (msgElement) {
    msgElement.innerHTML = `<div class="msg ${type}">${text}</div>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const staffLoginForm = document.getElementById("staffLoginForm");
  if (staffLoginForm) {
    staffLoginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const pass = document.getElementById("password").value;

      const body = new URLSearchParams({
        email, password: pass, action: "staff-login"
      }).toString();

      try {
        const res = await fetch(SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body
        });

        const result = await res.json();

        if (result.status === "success") {
          localStorage.setItem("staffLogin", email);

          showMsg("Login Success! Redirecting...", "success");

          setTimeout(() => {
            window.location.href = "staff-dashboard.html";
          }, 1200);

        } else {
          // Display the error message from Apps Script if available, otherwise default
          showMsg(result.message || "Invalid Staff Login!", "error");
        }

      } catch (err) {
        console.error("Login Error:", err);
        showMsg("Network Error!", "error");
      }
    });
  }
});








// const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbykVVrRwAJNUFdGqRnKIFDVm-Q9O5Qrf_NawhkjnqnU-Ws12rTq6XLJi_Sz_xPee8hm/exec";

// function showMsg(text, type) {
//   document.getElementById("msg").innerHTML =
//     `<div class="msg ${type}">${text}</div>`;
// }

// document.getElementById("staffLoginForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const email = document.getElementById("email").value.trim();
//   const pass = document.getElementById("password").value;

//   const body = new URLSearchParams({
//     email, password: pass, action: "staff-login"
//   }).toString();

//   try {
//     const res = await fetch(SCRIPT_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body
//     });

//     const result = await res.json();

//     if (result.status === "success") {
//       localStorage.setItem("staffLogin", email);

//       showMsg("Login Success! Redirecting...", "success");

//       setTimeout(() => {
//         window.location.href = "staff-dashboard.html";
//       }, 1200);

//     } else {
//       showMsg("Invalid Staff Login!", "error");
//     }

//   } catch (err) {
//     showMsg("Network Error!", "error");
//   }
// });
