const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyI7LSo3npXj3xaWreYAXc2BILkBz0EYMZNAZ63VYHKKIOD-rloT9dVRRHwk4kKbClV/exec";


// Show message
function showMsg(text, type) {
  document.getElementById("msg").innerHTML =
    `<div class="msg ${type}">${text}</div>`;
}

// Submit registration
document.getElementById("regForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const dob = document.getElementById("dob").value;
  const pass = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if (pass !== confirm) {
    return showMsg("Passwords do not match!", "error");
  }

  // prepare data
const data = { name, email, dob, password: pass };

// use URLSearchParams to avoid preflight
const body = new URLSearchParams(data).toString();

try {
  const res = await fetch(SCRIPT_URL, {
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
    window.location.href = "Student Login.html";
  }, 1500);
} else {
  showMsg("Error saving data!", "error");
}

} catch (err) {
  console.error(err);
  showMsg("Network Error! Check script URL / deployment.", "error");
}

});
