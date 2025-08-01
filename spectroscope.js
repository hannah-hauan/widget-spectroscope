const spectroscope = document.getElementById("spectroscope");
const comparisonSpectrum = document.getElementById("comparison-spectrum").querySelector("img");
const gems = document.querySelectorAll(".gem");

let isDragging = false;
const snapDistance = 80; // distance in px from gem center to snap

// Mouse drag behavior
spectroscope.addEventListener("mousedown", () => isDragging = true);
document.addEventListener("mouseup", () => isDragging = false);

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  
  spectroscope.style.left = `${e.pageX - spectroscope.offsetWidth / 2}px`;
  spectroscope.style.top = `${e.pageY - spectroscope.offsetHeight / 2}px`;
  
  checkGemOverlap(true);
});

// Check gem overlap or snap
function checkGemOverlap(shouldSnap) {
  let spectroRect = spectroscope.getBoundingClientRect();
  let spectroCenterX = spectroRect.left + spectroRect.width / 2;
  let spectroCenterY = spectroRect.top + spectroRect.height / 2;
  
  let foundGem = false;
  
  gems.forEach(gem => {
    let gemRect = gem.getBoundingClientRect();
    let gemCenterX = gemRect.left + gemRect.width / 2;
    let gemCenterY = gemRect.top + gemRect.height / 2;
    
    let dist = Math.sqrt(
      Math.pow(spectroCenterX - gemCenterX, 2) +
      Math.pow(spectroCenterY - gemCenterY, 2)
    );
    
    if (dist < snapDistance) {
      if (shouldSnap) {
        // Snap the spectroscope to gem center
        spectroscope.style.left = `${gemCenterX - spectroscope.offsetWidth / 2}px`;
        spectroscope.style.top = `${gemCenterY - spectroscope.offsetHeight / 2}px`;
      }
      showSpectrum(gem.getAttribute("data-spectrum"));
      foundGem = true;
    }
  });
  
  if (!foundGem) {
    comparisonSpectrum.src = "";
    comparisonSpectrum.alt = "Absorption spectrum of selected gem";
  }
}

// Show spectrum image
function showSpectrum(spectrumId) {
  if (spectrumId === "ruby-spectrum") {
    comparisonSpectrum.src = "ruby-spectrum.jpg";
    comparisonSpectrum.alt = "Absorption spectrum of ruby";
  } else if (spectrumId === "spinel-spectrum") {
    comparisonSpectrum.src = "spinel-spectrum.jpg";
    comparisonSpectrum.alt = "Absorption spectrum of red spinel";
  }
}

// Keyboard accessibility
gems.forEach(gem => {
  gem.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      showSpectrum(gem.getAttribute("data-spectrum"));
      // Move spectroscope to gem's center visually
      let gemRect = gem.getBoundingClientRect();
      spectroscope.style.left = `${gemRect.left + gemRect.width / 2 - spectroscope.offsetWidth / 2}px`;
      spectroscope.style.top = `${gemRect.top + gemRect.height / 2 - spectroscope.offsetHeight / 2}px`;
    }
  });
  
  gem.addEventListener("click", () => {
    showSpectrum(gem.getAttribute("data-spectrum"));
    let gemRect = gem.getBoundingClientRect();
    spectroscope.style.left = `${gemRect.left + gemRect.width / 2 - spectroscope.offsetWidth / 2}px`;
    spectroscope.style.top = `${gemRect.top + gemRect.height / 2 - spectroscope.offsetHeight / 2}px`;
  });
});
