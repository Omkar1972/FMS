const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyHZJ3xuf0QZVKVJLKxOPIYe7kDXcIVJY717lLGzn4YHoMc3Fzb4BWK_5sDU77VhqWY/exec";

// 1. Page Load hote hi Email Box bharna
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    if (email) {
        document.getElementById("targetEmail").value = decodeURIComponent(email);
        loadExistingData(email); // Optional: Purana data load karne ke liye
    }
};

// 2. Save Button Click Function
function addStudent() {
    const email = document.getElementById("targetEmail").value;
    const totalFees = Number(document.getElementById("totalFees").value);
    const paid = Number(document.getElementById("paymentPaid").value);
    const batch = document.getElementById("batch").value;
    
    // ⭐ Login teacher ki email
    const staffEmail = localStorage.getItem("staffLoginEmail");

    if (!email || !totalFees) return alert("Email & Fees are required!");

    const remaining = totalFees - paid;
    let installments = [];
    let balance = remaining;
    let date = new Date();

    while (balance > 0) {
        date.setMonth(date.getMonth() + 1);
        let amt = balance >= 7000 ? 7000 : balance;
        installments.push({
            amount: amt,
            date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-05`,
            status: "Pending"
        });
        balance -= amt;
    }

    fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
            action: "addPaymentDetails",
            email: email,
            totalFees: totalFees,
            paymentPaid: paid,
            batch: batch,
            installments: installments,
            addedBy: staffEmail // ⭐ Save teacher info
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res.status === "success") {
            alert("Success!");
            window.location.href = "staff-dashboard.html";
        }
    });
}

function goToInstallments() {
    const email = document.getElementById("targetEmail").value;
    if (!email) return alert("Email missing!");
    // Naye page par email bhej rahe hain
    window.location.href = `view-installments.html?email=${encodeURIComponent(email)}`;
}






//Working add payments in student details page.........!!!!

// const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwL2MChkj6BZjm-e92PYBiWSoKyDLTz6TJO40k_wQqXSNyr0AiDlquojInDaYffTWG7/exec";

// // 1. Page Load hote hi Email Box bharna
// window.onload = () => {
//     const params = new URLSearchParams(window.location.search);
//     const email = params.get("email");
//     if (email) {
//         document.getElementById("targetEmail").value = decodeURIComponent(email);
//         loadExistingData(email); // Optional: Purana data load karne ke liye
//     }
// };

// // 2. Save Button Click Function
// function addStudent() {
//     const email = document.getElementById("targetEmail").value;
//     const totalFees = Number(document.getElementById("totalFees").value);
//     const paid = Number(document.getElementById("paymentPaid").value);
//     const batch = document.getElementById("batch").value;

//     if (!email || !totalFees) return alert("Email & Fees are required!");

//     // Automatic Installment Generation
//     const remaining = totalFees - paid;
//     let installments = [];
//     let balance = remaining;
//     let date = new Date();

//     while (balance > 0) {
//         date.setMonth(date.getMonth() + 1);
//         let amt = balance >= 7000 ? 7000 : balance;
//         installments.push({
//             amount: amt,
//             date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-05`,
//             status: "Pending"
//         });
//         balance -= amt;
//     }

//     // Sheet me Update bhejna
//     fetch(SCRIPT_URL, {
//         method: "POST",
//         body: JSON.stringify({
//             action: "addPaymentDetails",
//             email: email,
//             totalFees: totalFees,
//             paymentPaid: paid,
//             batch: batch,
//             installments: installments
//         })
//     })
//     .then(res => res.json())
//     .then(res => {
//         if (res.status === "success") {
//             alert("Data saved in Google Sheet!");
//             window.location.href = "staff-dashboard.html"; // Wapas dashboard
//         }
//     })
//     .catch(err => console.log(err));
// }















// ==========================================
// 1. PAGE LOAD HONE PAR URL SE EMAIL NIKALNA (No change)
// ==========================================
// window.onload = function() {
//     // URL se parameters padhna (e.g. ?email=abc@gmail.com)
//     const params = new URLSearchParams(window.location.search);
//     const email = params.get("email");

//     // targetEmail is the input box for the student's email
//     const targetEmailInput = document.getElementById("targetEmail");
//     if (targetEmailInput) {
//         if (email) {
//             // Agar email mila, toh input box me daal do
//             targetEmailInput.value = email;
//         } else {
//             alert("Koi Student select nahi kiya gaya hai! Wapas Dashboard jaa rahe hain.");
//             window.location.href = "dashboard.html"; // Ya jo bhi aapke main page ka naam hai
//         }
//     } else {
//         console.error("targetEmail element not found.");
//     }
// };

// // ==========================================
// // 2. DATA SAVE KARNA (Modified)
// // ==========================================
// function addStudent() { // HTML button me onclick="addStudent()" hona chahiye
    
//     const email = document.getElementById("targetEmail").value;
//     // Note: We use the value from the 'select' element for the count
//     const installmentCount = document.getElementById("installmentCount").value; 

//     if (!email) {
//         alert("Error: Student Email missing!");
//         return;
//     }

//     // Installments collect karna
//     let installments = [];

// if (installmentCount) {
//     for (let i = 1; i <= parseInt(installmentCount); i++) {
//         const amount = document.getElementById(`insAmount${i}`)?.value;
//         const date = document.getElementById(`insDate${i}`)?.value;

//         if (amount) {
//             installments.push({
//                 amount: amount,
//                 date: date || "TBA",
//                 status: "Pending",
//                 receiptUrl: ""
//             });
//         }
//     }
// }


//     // Data object banana
//     const data = {
//         action: "addPaymentDetails", // ⭐ Google Script me ye action check hoga
//         email: email, 
//         totalFees: document.getElementById("totalFees").value,
//         paymentPaid: document.getElementById("paymentPaid").value,
//         // paymentRemaining is removed as it should be calculated in the sheet.
//         batch: document.getElementById("batch").value,
//         installments: installments
//     };

//     // Button ko disable karein taaki double click na ho
//     const btn = document.querySelector(".add-btn");
//     if (!btn) {
//         console.error("Add button element not found.");
//         return;
//     }
//     btn.innerText = "Saving...";
//     btn.disabled = true;

//     // Replace this SCRIPT_URL with your actual deployed URL
//     const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzA6aD8upvCPFVysjekJmCkJPq4Hl6ZDz7lW1BK_nDovGByqpx_RgfIQ3jXjd0v-swz/exec";

//     fetch(SCRIPT_URL, {
//         method: "POST",
//         body: JSON.stringify(data)
//     })
//     .then(res => res.text())
//     .then(rawMsg => {
//         // Fetch ke response ko JSON parse karne ki koshish karein
//         let msg;
//         try {
//             msg = JSON.parse(rawMsg);
//         } catch(e) {
//             msg = { status: "error", message: "Server response error or not JSON: " + rawMsg };
//         }

//         if (msg.status === "success") {
//             alert("Data Saved Successfully!");
//             // Form reset karein (Email ko chod kar)
//             document.getElementById("totalFees").value = "";
//             document.getElementById("paymentPaid").value = "";
//             document.getElementById("batch").value = ""; // Reset batch selection too
//             document.getElementById("installmentsBox").innerHTML = "";
//             document.getElementById("installmentCount").value = ""; // Reset installment count
//         } else {
//              alert("Error Saving Data: " + msg.message);
//         }

//         // Wapas button normal karein
//         btn.innerText = "Add Student Details";
//         btn.disabled = false;
//     })
//     .catch(err => {
//         alert("Fetch Error: " + err);
//         btn.innerText = "Add Student Details";
//         btn.disabled = false;
//     });
// }

// // ==========================================
// // 3. INSTALLMENT BOX LOGIC (Slight change for robustness)
// // ==========================================
// function createInstallments() {
//     const count = parseInt(document.getElementById("installmentCount").value);
//     const box = document.getElementById("installmentsBox");
//     box.innerHTML = "";

//     if (isNaN(count) || count <= 0) return;

//     for (let i = 1; i <= count; i++) {
//         box.innerHTML += `
//             <div style="margin-bottom:15px;">
//                 <label>Installment ${i} Amount</label>
//                 <input type="number" id="insAmount${i}" placeholder="Amount">

//                 <label>Installment ${i} Date</label>
//                 <input type="date" id="insDate${i}">
//             </div>
//         `;
//     }
// }







// const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw5dZnEsmKdsyPF0BcvCHlEV6c2DgAcxRU65j0LauRer2YRydaL6lRh7Y26XvlekL6r/exec";

// // ==========================================
// // 1. PAGE LOAD HONE PAR URL SE EMAIL NIKALNA
// // ==========================================
// window.onload = function() {
//   // URL se parameters padhna (e.g. ?email=abc@gmail.com)
//   const params = new URLSearchParams(window.location.search);
//   const email = params.get("email");

//   if (email) {
//     // Agar email mila, toh input box me daal do
//     document.getElementById("targetEmail").value = email;
//   } else {
//     alert("Koi Student select nahi kiya gaya hai! Wapas Dashboard jaa rahe hain.");
//     window.location.href = "dashboard.html"; // Ya jo bhi aapke main page ka naam hai
//   }
// };

// // ==========================================
// // 2. DATA SAVE KARNA
// // ==========================================
// function addStudent() { // HTML button me onclick="addStudent()" hona chahiye
  
//   const email = document.getElementById("targetEmail").value;
//   const installmentCount = document.getElementById("installmentCount").value;

//   if (!email) {
//     alert("Error: Student Email missing!");
//     return;
//   }

//   // Installments collect karna
//   let installments = [];
//   if (installmentCount) {
//     for (let i = 1; i <= installmentCount; i++) {
//       let val = document.getElementById(`ins${i}`).value;
//       if (val) installments.push(val);
//     }
//   }

//   // Data object banana
//   const data = {
//     action: "addPaymentDetails", // ⭐ Google Script me ye action check hoga
//     email: email,                // ⭐ Ye wo email hai jo click karke aaya tha
//     totalFees: document.getElementById("totalFees").value,
//     paymentPaid: document.getElementById("paymentPaid").value,
//     paymentRemaining: document.getElementById("paymentRemaining").value,
//     batch: document.getElementById("batch").value,
//     installments: installments
//   };

//   // Button ko disable karein taaki double click na ho
//   const btn = document.querySelector(".add-btn");
//   btn.innerText = "Saving...";
//   btn.disabled = true;

//   fetch(SCRIPT_URL, {
//     method: "POST",
//     body: JSON.stringify(data)
//   })
//   .then(res => res.text())
//   .then(msg => {
//     alert("Data Saved Successfully!");
//     // Form reset karein (Email ko chod kar)
//     document.getElementById("totalFees").value = "";
//     document.getElementById("paymentPaid").value = "";
//     document.getElementById("paymentRemaining").value = "";
//     document.getElementById("installmentsBox").innerHTML = "";
    
//     // Wapas button normal karein
//     btn.innerText = "Add Student Details";
//     btn.disabled = false;
//   })
//   .catch(err => {
//     alert("Error: " + err);
//     btn.innerText = "Add Student Details";
//     btn.disabled = false;
//   });
// }

// // ==========================================
// // 3. INSTALLMENT BOX LOGIC (Purana wala same)
// // ==========================================
// function createInstallments() {
//   const count = document.getElementById("installmentCount").value;
//   const box = document.getElementById("installmentsBox");
//   box.innerHTML = "";

//   for (let i = 1; i <= count; i++) {
//     box.innerHTML += `
//       <div style="margin-bottom:10px;">
//         <label>Installment ${i}</label>
//         <input type="number" id="ins${i}" placeholder="Amount" style="width: 95%;">
//       </div>
//     `;
//   }
// }