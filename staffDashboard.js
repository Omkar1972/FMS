// staffDashboard.js

// ⭐ REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT URL ⭐
// NOTE: यह URL आपके Google Apps Script के doGet फ़ंक्शन को कॉल करता है
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwL2MChkj6BZjm-e92PYBiWSoKyDLTz6TJO40k_wQqXSNyr0AiDlquojInDaYffTWG7/exec"; 

// // --- Data Fetching and Display ---

// ⭐ FIX DATE FUNCTION (As provided by you - YYYY-MM-DD format) ⭐
function fixDate(d) {
    if (!d) return "";
    let date = new Date(d);

    // Note: The new Date(d) constructor handles the conversion from string 
    // or timestamp that typically comes from Google Sheets' JSON output.

    let yyyy = date.getFullYear();
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let dd = String(date.getDate()).padStart(2, "0");

    // Output: YYYY-MM-DD
    return `${yyyy}-${mm}-${dd}`; 
}

// --- Initial Checks and Redirects ---
document.addEventListener("DOMContentLoaded", () => {
    // Optional: Redirect if not logged in
    // const loggedInEmail = localStorage.getItem("staffLogin");
    // if (!loggedInEmail) {
    //     window.location.href = "staff-login.html";
    // }
    loadStudents();
});

// --- Dashboard Actions ---

function logout() {
    localStorage.removeItem("staffLogin"); 
    alert("Logged out!");
    window.location.href = "index.html";
}

function goToAddStudent() {
    window.location.href = "Student register.html";
}

// ⭐ STUDENT DATA LOADING (Using the fixed fixDate function) ⭐
function loadStudents() {
    const tbody = document.querySelector("#studentsTable tbody");
    if (!tbody) return;

    // Loading message
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">Loading student data...</td></tr>';
    
    // Fetch all students using a simple GET request
    fetch(SCRIPT_URL) 
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(students => {
            tbody.innerHTML = "";

            if (Array.isArray(students) && students.length > 0) {
                students.forEach((s, index) => {
                    const row = document.createElement("tr");
                    
                    // ⭐ Row clickable (Email pass karna)
                    row.style.cursor = "pointer";
                    row.onclick = () => {
                        // Email ko URL safe banane ke liye encodeURIComponent ka istemal
                        window.location.href = `student details.html?email=${encodeURIComponent(s.email)}`;
                    };

                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${s.name || 'N/A'}</td>
                        <td>${s.email || 'N/A'}</td>
                        <td>${fixDate(s.dob)}</td> 
                        
                        <td>
                            <button 
                                style="
                                    background:#ff4d4d;
                                    color:white;
                                    border:none;
                                    padding:6px 12px;
                                    border-radius:5px;
                                    cursor:pointer;
                                "
                                // Delete button click पर event propagation रोकें
                                onclick="deleteStudent('${s.email}'); event.stopPropagation();">
                                Delete
                            </button>
                        </td>
                    `;
                    
                    tbody.appendChild(row);
                });
            } else {
                // If students array is empty
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">No students found in the system.</td></tr>';
            }

            const studentsTable = document.getElementById("studentsTable");
            if (studentsTable) {
                studentsTable.style.display = "table";
            }
        })
        .catch(err => {
            console.error("Error fetching students:", err);
            const tbody = document.querySelector("#studentsTable tbody");
            if(tbody) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px; color: red;">Failed to load data. Check server connection or Apps Script URL.</td></tr>';
            }
        });
}

// ⭐ DELETE STUDENT
function deleteStudent(email) {
    if (!confirm("Do you really want to delete this student?")) return;

    fetch(
        SCRIPT_URL,
        {
            method: "POST",
            body: JSON.stringify({
                action: "delete",
                email: email,
            }),
            headers: { "Content-Type": "application/json" },
        }
    )
    .then((res) => res.json())
    .then((result) => {
        if (result.status === "success") {
            alert("Student deleted successfully!");
            loadStudents(); // Refresh the list
        } else {
            alert("Failed to delete student: " + result.message);
        }
    })
    .catch((err) => {
        alert("Network Error during deletion.");
        console.error(err);
    });
}



// // ⭐ REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT URL ⭐
// // NOTE: This URL is used by both loadStudents and deleteStudent
// const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxWbzV3r4fpzAkMqxIhvAaoLwfHF80m85HpM9w3A_BNFzQJcFV9liBEESde4KUpkbcd/exec"; 

// // --- Initial Checks and Redirects ---
// document.addEventListener("DOMContentLoaded", () => {
//     const loggedInEmail = localStorage.getItem("staffLogin");
//     // Optional: Redirect if not logged in
//     // if (!loggedInEmail) {
//     //     window.location.href = "staff-login.html";
//     // }
//     loadStudents();
// });

// // --- Dashboard Actions ---

// function logout() {
//     // NOTE: Changed from "StaffLogin" to "staffLogin" for consistency with original code
//     localStorage.removeItem("staffLogin"); 
//     alert("Logged out!");
//     window.location.href = "index.html";
// }

// function goToAddStudent() {
//     window.location.href = "Student register.html";
// }

// function showAddForm() {
//     const addForm = document.getElementById("addForm");
//     const studentsTable = document.getElementById("studentsTable");
//     if (addForm && studentsTable) {
//         addForm.style.display = "block";
//         studentsTable.style.display = "none";
//     }
// }

// function addStudent() {
//     // NOTE: This function still uses local storage logic. 
//     // It needs to be updated to send a 'student-register' action via POST request to SCRIPT_URL
//     alert("This function is currently only saving to local storage. It should be updated to use the Google Sheets API for new student registration.");
//     loadStudents();
// }


// // --- Data Fetching and Display ---

// // Fix date format for display
// function fixDate(d) {
//     if (!d) return "";
//     let date = new Date(d);

//     // Optional: IST Fix (Only use if necessary based on your Sheet data entry)
//     // let date = new Date(new Date(d).getTime() + (5.5 * 60 * 60 * 1000)); 

//     let yyyy = date.getFullYear();
//     let mm = String(date.getMonth() + 1).padStart(2, "0");
//     let dd = String(date.getDate()).padStart(2, "0");

//     return `${yyyy}-${mm}-${dd}`;
// }

// function loadStudents() {
//     // Fetch all students using a simple GET request
//     fetch(SCRIPT_URL) 
//         .then(res => res.json())
//         .then(students => {
//             const tbody = document.querySelector("#studentsTable tbody");
//             if (!tbody) return;

//             tbody.innerHTML = "";

//             if (Array.isArray(students)) {
//                 students.forEach((s, index) => {
//                     const row = document.createElement("tr");
        
//                     row.innerHTML = `
//                         <td>${index + 1}</td>
//                         <td>${s.name || 'N/A'}</td>
//                         <td>${s.email || 'N/A'}</td>
//                         <td>${fixDate(s.dob)}</td>
        
//                         <td>
//                             <button 
//                                 style="
//                                     background:#ff4d4d;
//                                     color:white;
//                                     border:none;
//                                     padding:6px 12px;
//                                     border-radius:5px;
//                                     cursor:pointer;
//                                 "
//                                 onclick="deleteStudent('${s.email}'); event.stopPropagation();">
//                                 Delete
//                             </button>
//                         </td>
//                     `;
        
//                     // Row clickable for details
//                     row.style.cursor = "pointer";
//                     row.onclick = () => {
//                         window.location.href = `student details.html?email=${s.email}`;
//                     };
        
//                     tbody.appendChild(row);
//                 });
//             }

//             const studentsTable = document.getElementById("studentsTable");
//             if (studentsTable) {
//                 studentsTable.style.display = "table";
//             }
//         })
//         .catch(err => {
//             console.error("Error fetching students:", err);
//             alert("Failed to load student data from the server.");
//         });
// }

// // ⭐ DELETE STUDENT (Using the structure that proved to work for you) ⭐
// function deleteStudent(email) {
//     if (!confirm("Do you really want to delete this student?")) return;

//     fetch(
//         SCRIPT_URL,
//         {
//             method: "POST",
//             // IMPORTANT: Removed the 'Content-Type': 'application/json' header 
//             // as this simpler request format was successful in your testing.
//             body: JSON.stringify({
//                 action: "delete", // Server-side action
//                 email: email
//             })
//         }
//     )
//         // Read the response as text, which is more forgiving than JSON
//         .then(res => res.text()) 
//         .then(msg => {
//             alert("Student Deleted!");
//             loadStudents(); // Reload the table
//         })
//         .catch(err => {
//             console.error("Deletion network error:", err);
//             alert("Network Error during deletion.");
//         });
// }







// function logout() {
//   localStorage.removeItem("StaffLogin");
//   alert("Logged out!");
//   window.location.href = "index.html";
// }

// function goToAddStudent() {
//   window.location.href = "Student register.html";
// }


// function showAddForm() {
//   document.getElementById("addForm").style.display = "block";
//   document.getElementById("studentsTable").style.display = "none";
// }

// function addStudent() {
//   const student = {
//     totalFees: document.getElementById("totalFees").value,
//     paidFees: document.getElementById("paidFees").value,
//     batch: document.getElementById("batchName").value,
//     installments: document.getElementById("installments").value,
//     receipt: document.getElementById("receipt").value,
//     attendance: document.getElementById("attendance").value
//   };

//   if (!student.totalFees || !student.paidFees) {
//     alert("Please fill at least Total Fees and Paid Fees!");
//     return;
//   }

//   let students = JSON.parse(localStorage.getItem("students") || "[]");
//   students.push(student);
//   localStorage.setItem("students", JSON.stringify(students));

//   alert("Student added successfully!");
//   document.querySelectorAll("#addForm input").forEach(i => i.value = "");

//   loadStudents();
// }

// // Fix date format
// function fixDate(d) {
//   if (!d) return "";
//   let date = new Date(d);
//   date = new Date(date.getTime() + (5.5 * 60 * 60 * 1000)); // IST Fix

//   let yyyy = date.getFullYear();
//   let mm = String(date.getMonth() + 1).padStart(2, "0");
//   let dd = String(date.getDate()).padStart(2, "0");

//   return `${yyyy}-${mm}-${dd}`;
// }

// function loadStudents() {
//   fetch("https://script.google.com/macros/s/AKfycbykVVrRwAJNUFdGqRnKIFDVm-Q9O5Qrf_NawhkjnqnU-Ws12rTq6XLJi_Sz_xPee8hm/exec")
//     .then(res => res.json())
//     .then(students => {
//       const tbody = document.querySelector("#studentsTable tbody");
//       tbody.innerHTML = "";

//       students.forEach((s, index) => {
//         const row = document.createElement("tr");

//         row.innerHTML = `
//          <td>${index + 1}</td>
//          <td>${s.name}</td>
//          <td>${s.email}</td>
//          <td>${fixDate(s.dob)}</td>

//          <td>
//             <button 
//               style="
//                 background:#ff4d4d;
//                 color:white;
//                 border:none;
//                 padding:6px 12px;
//                 border-radius:5px;
//                 cursor:pointer;
//               "
//               onclick="deleteStudent('${s.email}'); event.stopPropagation();">
//               Delete
//             </button>
//          </td>
//         `;

//         // ⭐ Row clickable
//         row.style.cursor = "pointer";
//         row.onclick = () => {
//           window.location.href = `student details.html?email=${s.email}`;
//         };

//         tbody.appendChild(row);
//       });

//       document.getElementById("studentsTable").style.display = "table";
//     });
// }

// // ⭐ DELETE STUDENT
// function deleteStudent(email) {
//   if (!confirm("Do you really want to delete this student?")) return;

//   fetch(
//     "https://script.google.com/macros/s/AKfycbykVVrRwAJNUFdGqRnKIFDVm-Q9O5Qrf_NawhkjnqnU-Ws12rTq6XLJi_Sz_xPee8hm/exec",
//     {
//       method: "POST",
//       body: JSON.stringify({
//         action: "delete",
//         email: email
//       })
//     }
//   )
//     .then(res => res.text())
//     .then(msg => {
//       alert("Student Deleted!");
//       loadStudents();
//     });
// }

// // Load on page open
// window.onload = function () {
//   loadStudents();
// };




