// Simple image grid loader with randomization
function loadImageGrid() {
  const grid = document.getElementById('imageGrid');
  const imageFolder = '../assets/images/';
  const totalImages = 21; // 3×7 grid
  
  // Create array of image numbers and shuffle it
  const imageNumbers = Array.from({length: totalImages}, (_, i) => i + 1);
  
  // Fisher-Yates shuffle algorithm
  for (let i = imageNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imageNumbers[i], imageNumbers[j]] = [imageNumbers[j], imageNumbers[i]];
  }
  
  // Create 21 grid items with shuffled images
  for (let i = 0; i < totalImages; i++) {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    
    const img = document.createElement('img');
    img.src = `${imageFolder}image (${imageNumbers[i]}).jpg`;
    img.alt = `Science activity ${imageNumbers[i]}`;
    img.className = 'grid-image';
    
    // Only show image after it's fully loaded
    img.onload = () => img.classList.add('loaded');
    
    gridItem.appendChild(img);
    grid.appendChild(gridItem);
  }
}