// ================= FOOTER INFO =================
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// ================= FORM DATA DISPLAY =================
const params = new URLSearchParams(window.location.search);
const list = document.getElementById('formData');

const fields = [
  { label: 'First Name', key: 'fname' },
  { label: 'Last Name', key: 'lname' },
  { label: 'Email', key: 'email' },
  { label: 'Mobile Phone', key: 'phone' },
  { label: 'Business Name', key: 'business' },
  { label: 'Submission Date', key: 'timestamp' }
];

fields.forEach(field => {
  const value = params.get(field.key);
  if (value) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${field.label}:</strong> ${decodeURIComponent(value)}`;
    list.appendChild(li);
  }
});
