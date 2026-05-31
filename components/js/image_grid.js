// Simple image grid loader with randomization
function loadImageGrid() {
  const grid = document.getElementById("imageGrid");
  const sparkFolder = "../assets/event_images_new/";
  const oldFolder = "../assets/event_images/";
  const totalImages = 21; // 3×7 grid
  const sparkImagesCount = 16; // Use 16 spark images
  const oldImagesCount = 5; // Add 5 random old images

  // Create array of spark images (spark_image_01 through spark_image_16)
  const sparkImages = Array.from({ length: sparkImagesCount }, (_, i) => ({
    src: `${sparkFolder}spark_image_${String(i + 1).padStart(2, "0")}.jpg`,
    alt: `Science activity ${i + 1}`,
  }));

  // Create array of old image indices (1-21) for random selection
  const oldImageIndices = Array.from({ length: 21 }, (_, i) => i + 1);

  // Shuffle old image indices and pick first 5
  for (let i = oldImageIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [oldImageIndices[i], oldImageIndices[j]] = [
      oldImageIndices[j],
      oldImageIndices[i],
    ];
  }

  const selectedOldImages = oldImageIndices
    .slice(0, oldImagesCount)
    .map((idx) => ({
      src: `${oldFolder}image (${idx}).jpg`,
      alt: `Science activity ${idx}`,
    }));

  // Combine spark and old images
  const allImages = [...sparkImages, ...selectedOldImages];

  // Fisher-Yates shuffle algorithm on all images
  for (let i = allImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allImages[i], allImages[j]] = [allImages[j], allImages[i]];
  }

  // Create 21 grid items with shuffled images
  for (let i = 0; i < totalImages; i++) {
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";

    const img = document.createElement("img");
    img.src = allImages[i].src;
    img.alt = allImages[i].alt;
    img.className = "grid-image";

    // Only show image after it's fully loaded
    img.onload = () => img.classList.add("loaded");

    gridItem.appendChild(img);
    grid.appendChild(gridItem);
  }
}

// Function to get 2 random spark images
function getTwoRandomSparkImages() {
  const sparkCount = 18; // We have spark_image_01 through spark_image_18
  const randomIndices = [];
  
  // Get 2 unique random indices
  while (randomIndices.length < 2) {
    const idx = Math.floor(Math.random() * sparkCount) + 1;
    if (!randomIndices.includes(idx)) {
      randomIndices.push(idx);
    }
  }
  
  return randomIndices.map(idx => ({
    src: `../assets/event_images_new/spark_image_${String(idx).padStart(2, "0")}.jpg`,
    alt: `Science activity ${idx}`
  }));
}

// Load random images for Why SPARK section
function loadWhySparkImages() {
  const container = document.getElementById("whySparkImages");
  if (!container) return;
  
  const images = getTwoRandomSparkImages();
  
  images.forEach(imgData => {
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "why-spark-side-image";
    
    const img = document.createElement("img");
    img.src = imgData.src;
    img.alt = imgData.alt;
    
    img.onload = () => img.classList.add("loaded");
    
    imgWrapper.appendChild(img);
    container.appendChild(imgWrapper);
  });
}

// Load random images for Get Involved sections
function loadInvolvedImages() {
  const involvedImg1 = document.getElementById("involvedImg1");
  const involvedImg2 = document.getElementById("involvedImg2");
  
  if (involvedImg1) {
    const images1 = getTwoRandomSparkImages();
    images1.forEach(imgData => {
      const img = document.createElement("img");
      img.src = imgData.src;
      img.alt = imgData.alt;
      
      img.onload = () => img.classList.add("loaded");
      
      involvedImg1.appendChild(img);
    });
  }
  
  if (involvedImg2) {
    const images2 = getTwoRandomSparkImages();
    images2.forEach(imgData => {
      const img = document.createElement("img");
      img.src = imgData.src;
      img.alt = imgData.alt;
      
      img.onload = () => img.classList.add("loaded");
      
      involvedImg2.appendChild(img);
    });
  }
}
