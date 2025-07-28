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
