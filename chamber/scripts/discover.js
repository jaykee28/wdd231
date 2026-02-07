// Debug
console.log("Discover.js loaded");


import { places } from "../data/discover.mjs";

// --- Last visit message ---
const visitMessage = document.getElementById("visit-message");
const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

let message = "";

if (!lastVisit) {
  message = "Welcome! Let us know if you have any questions.";
} else {
  const lastVisitTime = parseInt(lastVisit, 10);
  const diffMs = now - lastVisitTime;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    message = "Back so soon! Awesome!";
  } else if (diffDays === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${diffDays} days ago.`;
  }
}

if (visitMessage) {
  visitMessage.textContent = message;
}

localStorage.setItem("lastVisit", now.toString());


console.log("Imported places:", places);

const grid = document.querySelector(".discover-grid");

if (!grid) {
  console.error("ERROR: .discover-grid element not found!");
} else {
  places.forEach((place, index) => {
    const card = document.createElement("div");
    card.classList.add("discover-card");

    // Assign a unique grid-area name (important!)
    card.style.gridArea = `card${index + 1}`;

    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="${place.image}" alt="${place.name}" loading="lazy">
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button>Learn More</button>
    `;

    grid.appendChild(card);
  });

  console.log("Cards generated:", grid.children.length);
}
