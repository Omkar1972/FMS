const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyI7LSo3npXj3xaWreYAXc2BILkBz0EYMZNAZ63VYHKKIOD-rloT9dVRRHwk4kKbClV/exec";

// show message
function showMsg(text, type) {
  document.getElementById("msg").innerHTML =
    `<div class="msg ${type}">${text}</div>`;
}

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const body = new URLSearchParams({ email, password, action: "login" }).toString();

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    });

    const result = await res.json();

    if (result.status === "success") {

       // Save student email for dashboard
      localStorage.setItem("studentEmail", email);

      showMsg("Login successful! Redirecting...", "success");

      setTimeout(() => {
        window.location.href = "Student dashboard.html";
      }, 1200);

    } else {
      showMsg("Invalid email or password!", "error");
    }

  } catch (error) {
    showMsg("Network error!", "error");
  }
});
