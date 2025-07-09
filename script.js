console.log("Script loaded!");

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// scroll effect for header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(102, 126, 234, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background =
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    header.style.backdropFilter = "none";
  }
});

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

// contact form submission
const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        showToast(json.message);
      } else {
        console.log(response);
        showToast(json.message);
      }
    })
    .catch((error) => {
      console.log(error);
      showToast("Something went wrong!");
    })
    .then(function () {
      form.reset();
    });
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerHTML = "";
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}