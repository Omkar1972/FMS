
// ⭐ REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT URL ⭐
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzRs416jWol82HMr9Bu2Iz9_BPgA5SPUvsKurvuborsX3R8ie8sPMszaiGWKP9tuOug/exec"; 

function showMsg(text, type) {
  const msgElement = document.getElementById("msg");
  if (msgElement) {
    msgElement.innerHTML = `<div class="msg ${type}">${text}</div>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const staffForm = document.getElementById("staffForm");
  if (staffForm) {
    staffForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const pass = document.getElementById("password").value;
      const confirm = document.getElementById("confirm").value;

      if (pass !== confirm) {
        return showMsg("Passwords do not match!", "error");
      }

      const body = new URLSearchParams({
        name, email, password: pass, role: "staff", action: "staff-register"
      }).toString();

      try {
        const res = await fetch(SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body
        });

        const result = await res.json();

        if (result.status === "success") {
          showMsg("Staff Registered Successfully!", "success");
          staffForm.reset();

          setTimeout(() => {
            window.location.href = "staff-login.html";
          }, 1200);

        } else {
          // Handle specific error from Apps Script (e.g., Email already registered)
          showMsg(result.message || "Error saving staff!", "error");
        }

      } catch (err) {
        console.error("Registration Error:", err);
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

// document.getElementById("staffForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const pass = document.getElementById("password").value;
//   const confirm = document.getElementById("confirm").value;

//   if (pass !== confirm) {
//     return showMsg("Passwords do not match!", "error");
//   }

//   const body = new URLSearchParams({
//     name, email, password: pass, role: "staff", action: "staff-register"
//   }).toString();

//   try {
//     const res = await fetch(SCRIPT_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body
//     });

//     const result = await res.json();

//     if (result.status === "success") {
//       showMsg("Staff Registered Successfully!", "success");
//       document.getElementById("staffForm").reset();

//      setTimeout(() => {
//         window.location.href = "staff-login.html";
//       }, 1200);

//     } else {
//       showMsg("Error saving staff!", "error");
//     }

//   } catch (err) {
//     showMsg("Network Error!", "error");
//   }
// });
