// const spectroscope = document.getElementById("spectroscope");
// const comparisonSpectrum = document.getElementById("comparison-spectrum").querySelector("img");
// const gems = document.querySelectorAll(".gem");

// let isDragging = false;
// const snapDistance = 80;

// // Get the bounding box of Ruby + Spinel area
// const gemContainer = document.querySelector(".gem-container");
// const gemBounds = gemContainer.getBoundingClientRect();

// // Start position — right side of gem container
// let startX = gemBounds.right + 40;
// let startY = gemBounds.top + gemBounds.height / 2 - 60; // centered vertically

// let spectroX = startX;
// let spectroY = startY;

// updateSpectroscopePosition();

// // Mouse drag
// spectroscope.addEventListener("mousedown", () => isDragging = true);
// document.addEventListener("mouseup", () => isDragging = false);
// document.addEventListener("mousemove", (e) => {
//   if (!isDragging) return;
//   spectroX = e.pageX - spectroscope.offsetWidth / 2;
//   spectroY = e.pageY - spectroscope.offsetHeight / 2;
//   clampPosition();
//   updateSpectroscopePosition();
//   checkGemOverlap();
// });

// // Keyboard movement
// spectroscope.addEventListener("keydown", (e) => {
//   let step = 20;

//   switch (e.key) {
//     case "ArrowUp":
//       spectroY -= step;
//       break;
//     case "ArrowDown":
//       spectroY += step;
//       break;
//     case "ArrowLeft":
//       spectroX -= step;
//       break;
//     case "ArrowRight":
//       spectroX += step;
//       break;
//     case "Escape":
//       spectroX = startX;
//       spectroY = startY;
//       updateSpectroscopePosition();
//       comparisonSpectrum.src = "";
//       comparisonSpectrum.alt = "Absorption spectrum of selected gem";
//       return;
//     default:
//       return; // allow Tab to exit
//   }

//   e.preventDefault(); // prevent scroll
//   clampPosition();
//   updateSpectroscopePosition();
//   checkGemOverlap();
// });

// function clampPosition() {
//   // Restrict movement to gem container area + starting area
//   const bounds = gemContainer.getBoundingClientRect();

//   // Allow movement from Ruby to Spinel + starting zone on the right
//   const minX = bounds.left - spectroscope.offsetWidth / 2;
//   const maxX = bounds.right + 40;
//   const minY = bounds.top - spectroscope.offsetHeight / 2;
//   const maxY = bounds.bottom - spectroscope.offsetHeight / 2;

//   if (spectroX < minX) spectroX = minX;
//   if (spectroY < minY) spectroY = minY;
//   if (spectroX > maxX) spectroX = maxX;
//   if (spectroY > maxY) spectroY = maxY;
// }

// function updateSpectroscopePosition() {
//   spectroscope.style.left = `${spectroX}px`;
//   spectroscope.style.top = `${spectroY}px`;
// }

// function checkGemOverlap() {
//   let spectroRect = spectroscope.getBoundingClientRect();
//   let spectroCenterX = spectroRect.left + spectroRect.width / 2;
//   let spectroCenterY = spectroRect.top + spectroRect.height / 2;

//   let inRange = false;

//   gems.forEach(gem => {
//     let gemRect = gem.getBoundingClientRect();
//     let gemCenterX = gemRect.left + gemRect.width / 2;
//     let gemCenterY = gemRect.top + gemRect.height / 2;
//     let dist = Math.sqrt(
//       Math.pow(spectroCenterX - gemCenterX, 2) +
//       Math.pow(spectroCenterY - gemCenterY, 2)
//     );

//     if (dist < snapDistance) {
//       showSpectrum(gem.getAttribute("data-spectrum"));
//       inRange = true;
//     }
//   });

//   if (!inRange) {
//     comparisonSpectrum.src = "";
//     comparisonSpectrum.alt = "Absorption spectrum of selected gem";
//   }
// }

// function showSpectrum(spectrumId) {
//   if (spectrumId === "ruby-spectrum") {
//     comparisonSpectrum.src = "ruby-spectrum.jpg";
//     comparisonSpectrum.alt = "Absorption spectrum of ruby";
//   } else if (spectrumId === "spinel-spectrum") {
//     comparisonSpectrum.src = "spinel-spectrum.jpg";
//     comparisonSpectrum.alt = "Absorption spectrum of red spinel";
//   }
// }




const spectroscope = document.getElementById("spectroscope");
const comparisonSpectrum = document.getElementById("comparison-spectrum").querySelector("img");
const gems = document.querySelectorAll(".gem");
const gameContainer = document.getElementById("gameContainer");

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

const snapDistance = 80;

// Start position — right side of container
let spectroX = 600;
let spectroY = 200;

spectroscope.style.left = `${spectroX}px`;
spectroscope.style.top = `${spectroY}px`;

// Mouse drag start
spectroscope.addEventListener("mousedown", (e) => {
  isDragging = true;
  const rect = spectroscope.getBoundingClientRect();
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;
});

// Mouse drag stop
document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Mouse move with drag offset
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  spectroX = e.clientX - dragOffsetX - gameContainer.getBoundingClientRect().left;
  spectroY = e.clientY - dragOffsetY - gameContainer.getBoundingClientRect().top;
  clampPosition();
  updateSpectroscopePosition();
  checkGemOverlap();
});

// Keyboard movement
spectroscope.addEventListener("keydown", (e) => {
  let step = 20;

  switch (e.key) {
    case "ArrowUp":
      spectroY -= step;
      break;
    case "ArrowDown":
      spectroY += step;
      break;
    case "ArrowLeft":
      spectroX -= step;
      break;
    case "ArrowRight":
      spectroX += step;
      break;
    case "Escape":
      resetSpectroscope();
      return;
    default:
      return; // allow Tab to move focus away
  }

  e.preventDefault();
  clampPosition();
  updateSpectroscopePosition();
  checkGemOverlap();
});

function resetSpectroscope() {
  spectroX = 600;
  spectroY = 200;
  clampPosition();
  updateSpectroscopePosition();
  comparisonSpectrum.src = "";
  comparisonSpectrum.alt = "Absorption spectrum of selected gem";
}

function clampPosition() {
  const containerRect = gameContainer.getBoundingClientRect();
  const maxX = 750 - spectroscope.offsetWidth;
  const maxY = 500 - spectroscope.offsetHeight;

  if (spectroX < 0) spectroX = 0;
  if (spectroY < 0) spectroY = 0;
  if (spectroX > maxX) spectroX = maxX;
  if (spectroY > maxY) spectroY = maxY;
}

function updateSpectroscopePosition() {
  spectroscope.style.left = `${spectroX}px`;
  spectroscope.style.top = `${spectroY}px`;
}

function checkGemOverlap() {
  let spectroRect = spectroscope.getBoundingClientRect();
  let spectroCenterX = spectroRect.left + spectroRect.width / 2;
  let spectroCenterY = spectroRect.top + spectroRect.height / 2;

  let inRange = false;

  gems.forEach(gem => {
    const label = gem.getAttribute("aria-label");
    if (label !== "Ruby" && label !== "Red Spinel") return; // ignore other gems

    let gemRect = gem.getBoundingClientRect();
    let gemCenterX = gemRect.left + gemRect.width / 2;
    let gemCenterY = gemRect.top + gemRect.height / 2;
    let dist = Math.sqrt(
      Math.pow(spectroCenterX - gemCenterX, 2) +
      Math.pow(spectroCenterY - gemCenterY, 2)
    );

    if (dist < snapDistance) {
      showSpectrum(gem.getAttribute("data-spectrum"));
      inRange = true;
    }
  });

  if (!inRange) {
    comparisonSpectrum.src = "";
    comparisonSpectrum.alt = "Absorption spectrum of selected gem";
  }
}

function showSpectrum(spectrumId) {
  if (spectrumId === "ruby-spectrum") {
    comparisonSpectrum.src = "ruby-spectrum.jpg";
    comparisonSpectrum.alt = "Absorption spectrum of ruby";
  } else if (spectrumId === "spinel-spectrum") {
    comparisonSpectrum.src = "spinel-spectrum.jpg";
    comparisonSpectrum.alt = "Absorption spectrum of red spinel";
  }
}
