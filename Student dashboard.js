const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxjDlQJPGFEwaQEPkqWBfZQgvl6gPxMJzBQEBcnxEY6ubYSZvaig2gqsY2T8fepS7iq/exec";

const studentEmail = sessionStorage.getItem("studentEmail");

if (!studentEmail) {
  window.location.href = "Student Login.html";
}

fetch(`${SCRIPT_URL}?type=getStudent&email=${encodeURIComponent(studentEmail)}`)
  .then(res => res.json())
  .then(data => {

    if (data.status !== "success") {
      alert("Student not found");
      return;
    }

    const total = Number(data.totalFees || 0);
    const paid = Number(data.paidFees || 0);
    const remaining = total - paid;

    document.getElementById("studentTitle").innerText =
      data.name + " - Dashboard";

    document.getElementById("totalFees").innerText = "₹" + total;
    document.getElementById("paidFees").innerText = "₹" + paid;
    document.getElementById("remainingFees").innerText = "₹" + remaining;
    document.getElementById("batchName").innerText = data.batch || "-";

    const tbody = document.getElementById("installmentTableBody");
    tbody.innerHTML = "";

    (data.installments || []).forEach((ins, i) => {
      
  // Status ke hisaab se CSS class set karna
  const statusClass = ins.status === "Paid"
      ? "paid"
      : ins.status === "Rejected"
      ? "rejected"
      : "pending";

  // ⭐ PENALTY LOGIC: Assuming 'ins.penalty' field exists in data.
  // Agar Apps Script se penalty value nahi aa rahi hai, toh default 0 use karein.
  const penalty = Number(ins.penalty || 0); 
  
  // Receipt Content Decide Karein
  let receiptContent = '-'; // Default value agar Paid nahi hai

  if (ins.status === "Paid" && ins.receiptUrl) {
    // Agar Paid hai aur URL available hai, toh Download Button/Link dikhao
    receiptContent = `
      <a href="${ins.receiptUrl}" target="_blank" style="
        background: #4f46e5; 
        color: white; 
        padding: 5px 10px; 
        border-radius: 5px;
        text-decoration: none;
        font-size: 14px;
      ">Download</a>
    `;
  } else if (ins.status === "Paid" && !ins.receiptUrl) {
    // Agar Paid hai lekin URL missing hai
    receiptContent = 'URL Missing';
  }


  // Table Row (<tr>) ka structure - Naye columns shamil kiye
  tbody.innerHTML += `
    <tr>
      <td>${i + 1}</td>
      <td>${ins.date}</td>
      <td>₹${ins.amount}</td> 
      <td>₹${penalty}</td>       <td class="${statusClass}">
        ${ins.status}
      </td>
      <td>${receiptContent}</td>     </tr>
  `;
});
  });

function logout() {
  sessionStorage.removeItem("studentEmail");
  window.location.href = "index.html";
}

function viewAttendance() {
  alert("Attendance coming soon");
}






// // ⭐ REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT URL ⭐
// const SCRIPT_URL_DASHBOARD = "https://script.google.com/macros/s/AKfycbzfQJjIA46zisX6WRE1ZDCor_3qo4q-VgMYb0opmJiRTP7kd06XRVzJ2rJZmswL1rOz/exec"; 

// // --- Core Dashboard Logic ---

// const studentEmail = localStorage.getItem("studentEmail");

// // Check if student is logged in
// if (!studentEmail) {
//     // Redirect to login if email is not found in localStorage
//     window.location.href = "Student Login.html";
// } else {
//     // API Call to fetch student data
//     const url = `${SCRIPT_URL_DASHBOARD}?type=getStudent&email=${encodeURIComponent(studentEmail)}`;
    
//     fetch(url)
//         .then(async res => {
//             if (!res.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return res.json();
//         })
//         .then(data => {

//             if (data.status !== "success") {
//                 alert("Student record not found! Redirecting to login.");
//                 localStorage.removeItem("studentEmail");
//                 window.location.href = "Student Login.html";
//                 return;
//             }

//             // Data calculation and display
//             const total = parseFloat(data.totalFees) || 0;
//             const paid = parseFloat(data.paidFees) || 0;
//             const remain = total - paid;
            
//             // Set student title and fees summary
//             document.getElementById("studentTitle").innerText = data.name + " - Dashboard";
//             document.getElementById("totalFees").innerText = "₹" + total.toFixed(0);
//             document.getElementById("paidFees").innerText = "₹" + paid.toFixed(0);
//             document.getElementById("remainingFees").innerText = "₹" + remain.toFixed(0);
//             document.getElementById("batchName").innerText = data.batch || 'Not Assigned';

//             // Handle Installments Table
//             let tableBody = document.getElementById("installmentTableBody");
//             tableBody.innerHTML = "";

//             // Ensure installments is an array
//             const installments = Array.isArray(data.installments) ? data.installments : [];

//             installments.forEach((inst, index) => {
                
//                 let amountValue = 0;
//                 let dateValue = "TBA";
//                 let statusValue = "Pending";
//                 let receiptUrl = "";
                
//                 // Check if 'inst' is a properly structured object
//                 if (typeof inst === 'object' && inst !== null) {
//                     dateValue = inst.date || 'TBA';
//                     amountValue = parseFloat(inst.amount) || 0; 
//                     statusValue = inst.status || 'Pending';
//                     receiptUrl = inst.receiptUrl || '';
//                 } else {
//                      // Fallback for old/simple data format (though not expected with current Apps Script)
//                     amountValue = parseFloat(inst) || 0; 
//                 }

//                 tableBody.innerHTML += `
//                     <tr>
//                         <td>${index + 1}</td>
//                         <td>${dateValue}</td>
//                         <td>₹${amountValue.toFixed(0)}</td> 
//                         <td>${statusValue}</td>
//                         <td>
//                             <button class="receipt-btn" onclick="downloadReceipt('${receiptUrl}')" ${receiptUrl ? '' : 'disabled'}>
//                                 ${receiptUrl ? 'Download' : 'N/A'}
//                             </button>
//                         </td>
//                     </tr>
//                 `;
//             });

//         })
//         .catch(err => {
//             console.error("Error fetching student data: ", err);
//             // Optionally redirect on fetch failure
//             // window.location.href = "Student Login.html";
//         });
// }


// // --- Global Functions (Required for buttons) ---

// // Logout
// function logout() {
//     localStorage.removeItem("studentEmail");
//     // Change to your index page
//     window.location.href = "index.html"; 
// }

// // Receipt download (Called from HTML button)
// function downloadReceipt(url) {
//     if (!url || url === "") return alert("Receipt not available!");
//     window.open(url, "_blank");
// }

// // Overall receipt (Placeholder)
// function downloadOverallReceipt() {
//     alert("Overall receipt feature coming soon...");
// }

// // Attendance (Placeholder)
// function viewAttendance() {
//     alert("Attendance coming soon...");
// }







// const studentEmail = localStorage.getItem("studentEmail");

// if (!studentEmail) {
//     window.location.href = "Student Login.html";
// }

// // API Call
// fetch(`https://script.google.com/macros/s/AKfycbwHQDhJ0WUYot_jdi7CH-9Fw0uIcutfp182qf1FBfwYP-8SzMFl_A3p0DSN3CI2YzmO/exec?type=getStudent&email=${studentEmail}`)
//   .then(async res => {
//       if (!res.ok) {
//           throw new Error("Network response was not ok");
//       }
//       return res.json();
//   })
//   .then(data => {

//      if (data.status !== "success") {
//           alert("Student record not found!");
//           return;
//       }

//       // ⭐ NEW FIX: Data ko Number mein convert karein
//       const total = parseFloat(data.totalFees) || 0;
//       const paid = parseFloat(data.paidFees) || 0;
//       const remain = total - paid;
//       
//       // Title wagera set karna
//       document.getElementById("studentTitle").innerText = data.name + " - Dashboard";
//       
//       // ⭐ DISPLAY FIX: Ab Total, Paid, Remaining, Batch display honge
//       document.getElementById("totalFees").innerText = "₹" + total;
//       document.getElementById("paidFees").innerText = "₹" + paid;
//       document.getElementById("remainingFees").innerText = "₹" + remain;
//       
//       document.getElementById("batchName").innerText = data.batch;

//       // Installments
//       let tableBody = document.getElementById("installmentTableBody");
//       tableBody.innerHTML = "";

//       data.installments.forEach((inst, index) => {
//         
//         let amountValue = 0;
//         let dateValue = "TBA"; // To Be Announced
//         let statusValue = "Pending";
//         let receiptUrl = "";
        
//         // ⭐ FIX: Check karna ki 'inst' object hai ya sirf value
//         if (typeof inst === 'object' && inst !== null) {
//           // Agar data object format mein hai (jaisa hona chahiye)
//           dateValue = inst.date || 'TBA';
//           // Amount ko number mein convert karein, agar zero ya undefined hai toh 0
//           amountValue = parseFloat(inst.amount) || 0; 
//           statusValue = inst.status || 'Pending';
//           receiptUrl = inst.receiptUrl || '';
//         } else {
//           // Agar data sirf simple value (amount) ke roop mein saved hai (purana format)
//           amountValue = parseFloat(inst) || 0; 
//         }

//         tableBody.innerHTML += `
//           <tr>
//             <td>${index + 1}</td>
//             <td>${dateValue}</td>
//             <td>₹${amountValue.toFixed(0)}</td> 
//             <td>${statusValue}</td>
//             <td><button class="receipt-btn" onclick="downloadReceipt('${receiptUrl}')" ${receiptUrl ? '' : 'disabled'}>Download</button></td>
//           </tr>
//         `;
//       });

//   })
//   .catch(err => {
//       console.error("Error fetching student data: ", err);
//   });


// // Logout
// function logout() {
//     localStorage.removeItem("studentEmail");
//     window.location.href = "index.html";
// }

// // Receipt download
// function downloadReceipt(url) {
//   if (!url || url === "") return alert("Receipt not available!");
//   window.open(url, "_blank");
// }

// // Overall receipt
// function downloadOverallReceipt() {
//   alert("Overall receipt feature coming soon...");
// }

// // Attendance
// function viewAttendance() {
//   alert("Attendance coming soon...");
// }
