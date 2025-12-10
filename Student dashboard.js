
// ⭐ REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT URL ⭐
const SCRIPT_URL_DASHBOARD = "https://script.google.com/macros/s/AKfycbxIojHQrF6akwCzPoV-GJPGivVK_wFAGDS2PxGY8Qyw-340_N3ZD_Z6iLAoOOsKrbjO/exec"; 

// --- Core Dashboard Logic ---

const studentEmail = localStorage.getItem("studentEmail");

// Check if student is logged in
if (!studentEmail) {
    // Redirect to login if email is not found in localStorage
    window.location.href = "Student Login.html";
} else {
    // API Call to fetch student data
    const url = `${SCRIPT_URL_DASHBOARD}?type=getStudent&email=${encodeURIComponent(studentEmail)}`;
    
    fetch(url)
        .then(async res => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then(data => {

            if (data.status !== "success") {
                alert("Student record not found! Redirecting to login.");
                localStorage.removeItem("studentEmail");
                window.location.href = "Student Login.html";
                return;
            }

            // Data calculation and display
            const total = parseFloat(data.totalFees) || 0;
            const paid = parseFloat(data.paidFees) || 0;
            const remain = total - paid;
            
            // Set student title and fees summary
            document.getElementById("studentTitle").innerText = data.name + " - Dashboard";
            document.getElementById("totalFees").innerText = "₹" + total.toFixed(0);
            document.getElementById("paidFees").innerText = "₹" + paid.toFixed(0);
            document.getElementById("remainingFees").innerText = "₹" + remain.toFixed(0);
            document.getElementById("batchName").innerText = data.batch || 'Not Assigned';

            // Handle Installments Table
            let tableBody = document.getElementById("installmentTableBody");
            tableBody.innerHTML = "";

            // Ensure installments is an array
            const installments = Array.isArray(data.installments) ? data.installments : [];

            installments.forEach((inst, index) => {
                
                let amountValue = 0;
                let dateValue = "TBA";
                let statusValue = "Pending";
                let receiptUrl = "";
                
                // Check if 'inst' is a properly structured object
                if (typeof inst === 'object' && inst !== null) {
                    dateValue = inst.date || 'TBA';
                    amountValue = parseFloat(inst.amount) || 0; 
                    statusValue = inst.status || 'Pending';
                    receiptUrl = inst.receiptUrl || '';
                } else {
                     // Fallback for old/simple data format (though not expected with current Apps Script)
                    amountValue = parseFloat(inst) || 0; 
                }

                tableBody.innerHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${dateValue}</td>
                        <td>₹${amountValue.toFixed(0)}</td> 
                        <td>${statusValue}</td>
                        <td>
                            <button class="receipt-btn" onclick="downloadReceipt('${receiptUrl}')" ${receiptUrl ? '' : 'disabled'}>
                                ${receiptUrl ? 'Download' : 'N/A'}
                            </button>
                        </td>
                    </tr>
                `;
            });

        })
        .catch(err => {
            console.error("Error fetching student data: ", err);
            // Optionally redirect on fetch failure
            // window.location.href = "Student Login.html";
        });
}


// --- Global Functions (Required for buttons) ---

// Logout
function logout() {
    localStorage.removeItem("studentEmail");
    // Change to your index page
    window.location.href = "index.html"; 
}

// Receipt download (Called from HTML button)
function downloadReceipt(url) {
    if (!url || url === "") return alert("Receipt not available!");
    window.open(url, "_blank");
}

// Overall receipt (Placeholder)
function downloadOverallReceipt() {
    alert("Overall receipt feature coming soon...");
}

// Attendance (Placeholder)
function viewAttendance() {
    alert("Attendance coming soon...");
}







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
