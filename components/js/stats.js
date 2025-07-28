// stats animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll(".stat-number");
      statNumbers.forEach((stat) => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 50;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= finalValue) {
            stat.textContent =
              finalValue + (stat.textContent.includes("+") ? "+" : "");
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(currentValue);
          }
        }, 30);
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const statsSection = document.querySelector(".stats");
if (statsSection) {
  observer.observe(statsSection);
}
