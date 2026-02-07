// Debug
console.log("Discover.js loaded");


import { places } from "../data/discover.mjs";

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
