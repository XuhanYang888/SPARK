console.log("Script loaded!");

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

// Animate <details> open/close in .faq-list
document.querySelectorAll(".faq-list details").forEach((detail) => {
  const content = detail.querySelector("div");
  if (!content) return;

  // Set initial styles
  content.style.overflow = "hidden";
  content.style.height = detail.open ? content.scrollHeight + "px" : "0px";

  let closing = false;
  let opening = false;

  detail.addEventListener("toggle", function () {
    if (detail.open && !opening) {
      opening = true;
      content.style.display = "block";
      content.style.transition = "height 0.3s cubic-bezier(.4,0,.2,1)";
      content.style.height = "0px";
      void content.offsetWidth; // force reflow
      content.style.height = content.scrollHeight + "px";
      setTimeout(() => {
        content.style.height = "";
        opening = false;
      }, 300);
    } else if (!detail.open && !closing) {
      closing = true;
      content.style.transition = "height 0.3s cubic-bezier(.4,0,.2,1)";
      content.style.height = content.scrollHeight + "px";
      void content.offsetWidth; // force reflow
      content.style.height = "0px";
      setTimeout(() => {
        content.style.display = "";
        closing = false;
      }, 300);
    }
  });

  // Prevent instant close, animate instead
  detail.addEventListener(
    "click",
    function (e) {
      if (detail.open) {
        e.preventDefault();
        closing = true;
        content.style.transition = "height 0.3s cubic-bezier(.4,0,.2,1)";
        content.style.height = content.scrollHeight + "px";
        void content.offsetWidth;
        content.style.height = "0px";
        setTimeout(() => {
          detail.open = false;
          closing = false;
        }, 300);
      }
    },
    true
  );
});

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
