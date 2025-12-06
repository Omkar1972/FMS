const studentEmail = localStorage.getItem("studentEmail");

if (!studentEmail) {
    window.location.href = "Student Login.html";
}

// API Call
fetch(`https://script.google.com/macros/s/AKfycbyI7LSo3npXj3xaWreYAXc2BILkBz0EYMZNAZ63VYHKKIOD-rloT9dVRRHwk4kKbClV/exec?type=getStudent&email=${studentEmail}`)
  .then(async res => {
      if (!res.ok) {
          throw new Error("Network response was not ok");
      }
      return res.json();
  })
  .then(data => {

      if (data.status !== "success") {
          alert("Student record not found!");
          return;
      }

      document.getElementById("studentTitle").innerText = data.name + " - Dashboard";
      document.getElementById("totalFees").innerText = "₹" + data.totalFees;
      document.getElementById("paidFees").innerText = "₹" + data.paidFees;

      let remain = data.totalFees - data.paidFees;
      document.getElementById("remainingFees").innerText = "₹" + remain;
      document.getElementById("batchName").innerText = data.batch;

      // Installments
      let tableBody = document.getElementById("installmentTableBody");
      tableBody.innerHTML = "";

      data.installments.forEach((inst, index) => {
        tableBody.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${inst.date}</td>
            <td>₹${inst.amount}</td>
            <td>${inst.status}</td>
            <td><button class="receipt-btn" onclick="downloadReceipt('${inst.receiptUrl}')">Download</button></td>
          </tr>
        `;
      });

  })
  .catch(err => {
      console.error("Error fetching student data: ", err);
  });


// Logout
function logout() {
    localStorage.removeItem("studentEmail");
    window.location.href = "index.html";
}

// Receipt download
function downloadReceipt(url) {
  if (!url || url === "") return alert("Receipt not available!");
  window.open(url, "_blank");
}

// Overall receipt
function downloadOverallReceipt() {
  alert("Overall receipt feature coming soon...");
}

// Attendance
function viewAttendance() {
  alert("Attendance coming soon...");
}
