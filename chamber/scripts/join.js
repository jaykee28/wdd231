
// ===========================
// Last Modified
// ===========================
const lastModifiedSpan = document.getElementById('lastModified');
if (lastModifiedSpan) {
  lastModifiedSpan.textContent = document.lastModified;
}

// ===========================
// Footer Dates
// ===========================
document.getElementById('lastModified').textContent = document.lastModified;
document.getElementById('currentYear').textContent =
  new Date().getFullYear();

// ================= TIMESTAMP =================
const timestampField = document.getElementById('timestamp');
if (timestampField) {
  timestampField.value = new Date().toISOString();
}

// ================= MODALS =================
const modalLinks = document.querySelectorAll('[data-modal]');
const closeButtons = document.querySelectorAll('.close-modal');

modalLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const modal = document.getElementById(link.dataset.modal);
    modal.showModal();
  });
});

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.closest('dialog').close();
  });
});
