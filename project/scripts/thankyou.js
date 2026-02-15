// ================= Reservation Summary =================
const summaryEl = document.getElementById("reservation-summary");
const data = JSON.parse(localStorage.getItem("reservationData"));

if (data && summaryEl) {
  summaryEl.innerHTML = `
    <h2>Your Booking Details</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Date:</strong> ${data.date}</p>
    <p><strong>Time:</strong> ${data.time}</p>
    <p><strong>Guests:</strong> ${data.guests}</p>
    ${data.requests ? `<p><strong>Special Requests:</strong> ${data.requests}</p>` : ''}
  `;
}

// ================= Footer Info =================
const yearEl = document.getElementById("currentYear");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const modifiedEl = document.getElementById("lastModified");
if (modifiedEl) modifiedEl.textContent = document.lastModified;
