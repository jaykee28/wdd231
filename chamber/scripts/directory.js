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
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Network response was not ok');

    const members = await response.json();
    membersContainer.innerHTML = '';

    members.forEach(member => {
      const card = document.createElement('article');
      card.classList.add('member-card');

      card.innerHTML = `
        <img 
          src="images/${member.image}" 
          alt="${member.name} logo"
          class="member-logo"
          loading="lazy"
        >
        
        <div class="member-info">
          <p><strong>🏷️ Industry:</strong> ${member.industry}</p>
          <p><strong>ℹ️ About:</strong> ${member.description}</p>
          <p><strong>📍 Address:</strong> ${member.address}</p>
          <p><strong>📞 Phone:</strong> ${member.phone}</p>
          <p><strong>Membership:</strong> ${membershipText(member.membership)}</p>
          <a href="${member.website}" target="_blank" rel="noopener">
             🌐 Visit Website
          </a>
        </div>
      `;

      membersContainer.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading members:', error);
    membersContainer.innerHTML = '<p class="error">Unable to load directory data.</p>';
  }
}

// ===========================
// Membership Helper
// ===========================
function membershipText(level) {
  switch (level) {
    case 1: return 'Member';
    case 2: return 'Silver Member';
    case 3: return 'Gold Member';
    default: return 'Member';
  }
}

// ===========================
// Init
// ===========================
loadMembers();
