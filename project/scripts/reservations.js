// Get form element
const form = document.getElementById("reservation-form");

// Load saved form data and footer info
document.addEventListener("DOMContentLoaded", () => {
  // Pre-fill form if data exists
  const savedData = JSON.parse(localStorage.getItem("reservationData"));
  if (savedData) {
    Object.keys(savedData).forEach(key => {
      if (form[key]) form[key].value = savedData[key];
    });
  }

  // Footer dynamic year and last modified
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const modifiedEl = document.getElementById("lastModified");
  if (modifiedEl) modifiedEl.textContent = document.lastModified;
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Collect form data
  const formData = {};
  Array.from(form.elements).forEach(el => {
    if (el.name) formData[el.name] = el.value;
  });

  // Save to localStorage
  localStorage.setItem("reservationData", JSON.stringify(formData));

  // Redirect to thank-you page
  window.location.href = "thankyou.html";
});
