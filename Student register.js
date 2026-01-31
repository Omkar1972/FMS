

// ⭐ REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT URL ⭐
const SCRIPT_URL_REGISTER = "https://script.google.com/macros/s/AKfycbzRs416jWol82HMr9Bu2Iz9_BPgA5SPUvsKurvuborsX3R8ie8sPMszaiGWKP9tuOug/exec"; 


// Show message function
function showMsg(text, type) {
    const msgElement = document.getElementById("msg");
    if (msgElement) {
        msgElement.innerHTML = `<div class="msg ${type}">${text}</div>`;
    }
}

// Submit registration
document.addEventListener("DOMContentLoaded", () => {
    const regForm = document.getElementById("regForm");
    if (regForm) {
        regForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const dob = document.getElementById("dob").value;
            const pass = document.getElementById("password").value;
            const confirm = document.getElementById("confirm").value;

            const staffEmail =sessionStorage.getItem("staffLogin");

            if (pass !== confirm) {
                return showMsg("Passwords do not match!", "error");
            }

            // prepare data
            const data = { 
                name, 
                email, 
                dob, 
                password: pass, 
                addedBy: staffEmail, // Staff ki email yahan ja rahi hai
                action: "student-register" 
                
            };

            // Use URLSearchParams for x-www-form-urlencoded
            const body = new URLSearchParams(data).toString();

            try {
                const res = await fetch(SCRIPT_URL_REGISTER, {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
                    body
                });

                const result = await res.json();

                if (result.status === "success") {
                showMsg("Student Registered Successfully! Redirecting...", "success");
                document.getElementById("regForm").reset();

                setTimeout(() => {
        // 1. Check karein ki pichla page (referrer) Staff Dashboard tha ya nahi
        const cameFromStaff = document.referrer.toLowerCase().includes("staff-dashboard");
        
        // 2. LocalStorage se staff ki email check karein
        const staffEmail =sessionStorage.getItem("staffLogin");

        // ⭐ LOGIC: Agar staff logged in HAI AUR wo Staff Dashboard se aaya hai
        if (staffEmail && cameFromStaff) {
            window.location.href = "staff-dashboard.html";
        } else {
            // Baaki sabhi cases mein (Student khud register kare ya direct link ho)
            window.location.href = "Student Login.html";
        }
        }, 1500);
     } 
             else {
                    // This handles the "Email already registered" error from Apps Script
                    showMsg(result.message || "Error saving data!", "error");
                }

            } catch (err) {
                console.error("Network Error or JSON parsing failed:", err);
                showMsg("Network Error! Check script URL / deployment.", "error");
            }
        });
    }
});





// const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwHQDhJ0WUYot_jdi7CH-9Fw0uIcutfp182qf1FBfwYP-8SzMFl_A3p0DSN3CI2YzmO/exec";


// // Show message
// function showMsg(text, type) {
//   document.getElementById("msg").innerHTML =
//     `<div class="msg ${type}">${text}</div>`;
// }

// // Submit registration
// document.getElementById("regForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const dob = document.getElementById("dob").value;
//   const pass = document.getElementById("password").value;
//   const confirm = document.getElementById("confirm").value;

//   if (pass !== confirm) {
//     return showMsg("Passwords do not match!", "error");
//   }

//   // prepare data
// const data = { name, email, dob, password: pass, action: "student-register" };


// // use URLSearchParams to avoid preflight
// const body = new URLSearchParams(data).toString();

// try {
//   const res = await fetch(SCRIPT_URL, {
//     method: "POST",
//     mode: "cors",
//     headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
//     body
//   });

//   const result = await res.json();

//   if (result.status === "success") {
//   showMsg("Student Registered Successfully! Redirecting...", "success");
//   document.getElementById("regForm").reset();

//   setTimeout(() => {
//     window.location.href = "Student Login.html";
//   }, 1500);
// } else {
//   showMsg("Error saving data!", "error");
// }

// } catch (err) {
//   console.error(err);
//   showMsg("Network Error! Check script URL / deployment.", "error");
// }

// });




// const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbykVVrRwAJNUFdGqRnKIFDVm-Q9O5Qrf_NawhkjnqnU-Ws12rTq6XLJi_Sz_xPee8hm/exec";


// // Show message
// function showMsg(text, type) {
//   document.getElementById("msg").innerHTML =
//     `<div class="msg ${type}">${text}</div>`;
// }

// // Submit registration
// document.getElementById("regForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const dob = document.getElementById("dob").value;
//   const pass = document.getElementById("password").value;
//   const confirm = document.getElementById("confirm").value;

//   if (pass !== confirm) {
//     return showMsg("Passwords do not match!", "error");
//   }

//   // prepare data
// const data = { name, email, dob, password: pass ,action: "register" };

// // use URLSearchParams to avoid preflight
// const body = new URLSearchParams(data).toString();

// try {
//   const res = await fetch(SCRIPT_URL, {
//     method: "POST",
//     mode: "cors",
//     headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
//     body
//   });

//   const result = await res.json();

//   if (result.status === "success") {
//   showMsg("Student Registered Successfully! Redirecting...", "success");
//   document.getElementById("regForm").reset();

//   setTimeout(() => {
//     window.location.href = "Student Login.html";
//   }, 1500);
// } else {
//   showMsg("Error saving data!", "error");
// }

// } catch (err) {
//   console.error(err);
//   showMsg("Network Error! Check script URL / deployment.", "error");
// }

// });
