// Load images when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadImageGrid();

  const handbookSection = document.querySelector(".handbook-section");
  const budgetSection = document.querySelector(".budget-section");
  const showHandbookBtn = document.getElementById("show-handbook");
  const showBudgetBtn = document.getElementById("show-budget");

  // Function to update visibility and store choice
  const setSection = (section) => {
    // Remove active class from all buttons
    showHandbookBtn.classList.remove("active");
    showBudgetBtn.classList.remove("active");
    
    if (section === "handbook") {
      budgetSection.style.display = "none";
      handbookSection.style.display = "block";
      showHandbookBtn.classList.add("active");
      
      // Add fade-in animation to handbook content
      const container = handbookSection.querySelector('.container');
      if (container) {
        container.style.animation = "fadeIn 0.3s ease-in-out";
      }
    } else if (section === "budget") {
      handbookSection.style.display = "none";
      budgetSection.style.display = "block";
      showBudgetBtn.classList.add("active");
      
      // Add fade-in animation to budget content
      const container = budgetSection.querySelector('.container');
      if (container) {
        container.style.animation = "fadeIn 0.3s ease-in-out";
      }
    }
    
    // Persist choice
    try {
      localStorage.setItem("selectedSection", section);
    } catch (e) {
      // ignore storage errors
    }
  };

  // Load persisted choice or default to handbook for new users
  let saved = null;
  try {
    saved = localStorage.getItem("selectedSection");
  } catch (e) {
    // ignore
  }
  if (saved === "budget") {
    setSection("budget");
  } else {
    // default to handbook
    setSection("handbook");
  }

  // Button event listeners
  showHandbookBtn.addEventListener("click", () => setSection("handbook"));
  showBudgetBtn.addEventListener("click", () => setSection("budget"));
});
