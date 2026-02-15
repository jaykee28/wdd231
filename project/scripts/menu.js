const menuContainer = document.getElementById("menu-container");
const menuTitle = document.getElementById("menu-title");
const menuPricing = document.getElementById("menu-pricing");

const modal = document.getElementById("menu-modal");
const modalContent = document.getElementById("modal-content");

async function fetchMenu() {
  try {
    const response = await fetch("data/menu.json");
    const data = await response.json();

    menuTitle.textContent = `${data.month} Menu`;

    // PRICING (UNCHANGED)
    menuPricing.innerHTML = `
      <p><strong>Set Menu:</strong> ${data.menu.pricing.menu}</p>
      <p><strong>Optional Wine Pairing:</strong> ${data.menu.pricing.wine_pairing}</p>
      <p><strong>Kids Menu:</strong> ${data.menu.pricing.kids_menu}</p>
      <p>${data.menu.pricing.note}</p>
    `;

    Object.entries(data.menu).forEach(([sectionName, sectionData]) => {
      if (sectionName === "pricing") return;

      const header = document.createElement("h2");
      header.textContent =
        sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
      menuContainer.appendChild(header);

      const sectionDiv = document.createElement("div");
      sectionDiv.classList.add("menu-section");
      menuContainer.appendChild(sectionDiv);

      // snacks + kids menu (UNCHANGED)
      if (Array.isArray(sectionData)) {
        sectionData.forEach(item => createCard(item, sectionDiv));
      }

      // starters/mains/desserts
      else {
        if (sectionData.food) {
          sectionData.food.forEach(item => createCard(item, sectionDiv));
        }

        if (sectionData.drinks) {
          sectionData.drinks.forEach(drink =>
            createCard(drink, sectionDiv, true)
          );
        }
      }
    });

  } catch (err) {
    menuContainer.innerHTML = `<p>Failed to load menu</p>`;
  }
}

function createCard(item, sectionDiv, isDrink = false) {
  const card = document.createElement("div");
  card.classList.add("menu-card");

  if (isDrink) card.classList.add("drink-card");

  card.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    ${isDrink ? `<p class="drink-tag"></p>` : ""}
  `;

  card.addEventListener("click", () => showModal(item));
  sectionDiv.appendChild(card);
}

function showModal(item) {
  modalContent.innerHTML = `
    <span id="modal-close">&times;</span>
    <h3>${item.name}</h3>
    <img src="${item.image}" style="width:100%">
    <p>${item.description}</p>
  `;

  modal.style.display = "block";

  document.getElementById("modal-close").onclick = () =>
    (modal.style.display = "none");
}

window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

fetchMenu();
