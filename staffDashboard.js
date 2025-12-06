function logout() {
  localStorage.removeItem("StaffLogin");
  alert("Logged out!");
  window.location.href = "index.html";
}

function showAddForm() {
  document.getElementById("addForm").style.display = "block";
  document.getElementById("studentsTable").style.display = "none";
}

function addStudent() {
  const student = {
    totalFees: document.getElementById("totalFees").value,
    paidFees: document.getElementById("paidFees").value,
    batch: document.getElementById("batchName").value,
    installments: document.getElementById("installments").value,
    receipt: document.getElementById("receipt").value,
    attendance: document.getElementById("attendance").value
  };

  if (!student.totalFees || !student.paidFees) {
    alert("Please fill at least Total Fees and Paid Fees!");
    return;
  }

  let students = JSON.parse(localStorage.getItem("students") || "[]");
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  alert("Student added successfully!");
  document.querySelectorAll("#addForm input").forEach(i => i.value = "");

  loadStudents();
}

// Fix date format
function fixDate(d) {
  if (!d) return "";

  let date = new Date(d);
  date = new Date(date.getTime() + (5.5 * 60 * 60 * 1000)); // IST Fix

  let yyyy = date.getFullYear();
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

function loadStudents() {
  fetch("https://script.google.com/macros/s/AKfycbyI7LSo3npXj3xaWreYAXc2BILkBz0EYMZNAZ63VYHKKIOD-rloT9dVRRHwk4kKbClV/exec")
    .then(res => res.json())
    .then(students => {
      const tbody = document.querySelector("#studentsTable tbody");
      tbody.innerHTML = "";

      students.forEach(s => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${s.name}</td>
          <td>${s.email}</td>
          <td>${fixDate(s.dob)}</td>
        `;

        // ⭐ Puri row clickable
        row.style.cursor = "pointer";
        row.onclick = () => {
          window.location.href = `studentDetails.html?email=${s.email}`;
        };

        tbody.appendChild(row);
      });

      document.getElementById("studentsTable").style.display = "table";
    });
}


// Load students on page open
window.onload = function () {
  loadStudents();
};
