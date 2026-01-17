// ===========================
// Last Modified & Copyright
// ===========================
document.getElementById('lastModified').textContent = document.lastModified;
const copyright =
  document.createElement('p');
copyright.textContent = `© ${new Date().getFullYear()} Jacqueline Mufetu | WDD 231`;
document.querySelector('footer .footer-content').appendChild(copyright);

// ===========================
// Grid/List Toggle
// ===========================
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const membersContainer = document.getElementById('members');

gridBtn.addEventListener('click', () => {
  membersContainer.classList.add('grid-view');
  membersContainer.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
  membersContainer.classList.add('list-view');
  membersContainer.classList.remove('grid-view');
});

// ===========================
// Fetch & Display Members
// ===========================
async function loadMembers() {
  try {
    const response = await fetch('../data/members.json'); // adjust path if needed
    const members = await response.json();
    
    membersContainer.innerHTML = '';

    members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('member-card');

      card.innerHTML = `
        <img src="../images/${member.image}" alt="${member.name} Logo" class="member-logo">
        <h3>${member.name}</h3>
        <p><strong>Industry:</strong> ${member.industry}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">Visit Website</a></p>
        <p><strong>Membership Level:</strong> ${membershipText(member.membership)}</p>
        <p>${member.description}</p>
      `;
      membersContainer.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading members:', error);
    membersContainer.innerHTML = '<p>Failed to load member data.</p>';
  }
}

// Convert membership number to text
function membershipText(level) {
  switch(level) {
    case 1: return 'Member';
    case 2: return 'Silver';
    case 3: return 'Gold';
    default: return 'Member';
  }
}

// Load members on page load
loadMembers();
