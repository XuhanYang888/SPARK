// image grid loader
function loadImageGrid() {
  const grid = document.getElementById("imageGrid");
  const imageFolder = "../assets/images/";
  const totalImages = 21; // 3×7 grid

  // Create 21 grid items
  for (let i = 1; i <= totalImages; i++) {
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";

    const img = document.createElement("img");
    img.src = `${imageFolder}image (${i}).jpg`;
    img.alt = `Science activity ${i}`;
    img.className = "grid-image";

    // Only show image after it's fully loaded
    img.onload = () => img.classList.add("loaded");

    gridItem.appendChild(img);
    grid.appendChild(gridItem);
  }
}
