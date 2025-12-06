const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyI7LSo3npXj3xaWreYAXc2BILkBz0EYMZNAZ63VYHKKIOD-rloT9dVRRHwk4kKbClV/exec";

function showMsg(text, type) {
  document.getElementById("msg").innerHTML =
    `<div class="msg ${type}">${text}</div>`;
}

document.getElementById("staffForm").addEventListener("submit", async (e) => {
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
      document.getElementById("staffForm").reset();

     setTimeout(() => {
        window.location.href = "staff-login.html";
      }, 1200);

    } else {
      showMsg("Error saving staff!", "error");
    }

  } catch (err) {
    showMsg("Network Error!", "error");
  }
});
