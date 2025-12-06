const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyI7LSo3npXj3xaWreYAXc2BILkBz0EYMZNAZ63VYHKKIOD-rloT9dVRRHwk4kKbClV/exec";

function showMsg(text, type) {
  document.getElementById("msg").innerHTML =
    `<div class="msg ${type}">${text}</div>`;
}

document.getElementById("staffLoginForm").addEventListener("submit", async (e) => {
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
      showMsg("Invalid Staff Login!", "error");
    }

  } catch (err) {
    showMsg("Network Error!", "error");
  }
});
