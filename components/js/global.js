// smooth scroll with header offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// scroll effect for header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background =
      "linear-gradient(135deg, rgba(58, 71, 132, 0.85) 0%, rgba(24, 30, 70, 0.85) 100%)";
  } else {
    header.style.background =
      "linear-gradient(135deg, #3A4784 0%, #181e46 100%)";
  }
});

// mobile menu
function setupMobileMenu() {
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (!menuBtn || !mobileMenu) return;

  const newMenuBtn = menuBtn.cloneNode(true);
  menuBtn.parentNode.replaceChild(newMenuBtn, menuBtn);

  newMenuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    mobileMenu.classList.toggle("show");
  });

  document.addEventListener("click", function (e) {
    if (!mobileMenu.contains(e.target) && !newMenuBtn.contains(e.target)) {
      mobileMenu.classList.remove("show");
    }
  });
}
