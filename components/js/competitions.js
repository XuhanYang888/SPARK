// competitions.js – show the appropriate section based on URL query parameter
// Expected format: ?section=section-name where section-name matches the id suffix

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function showSection(section) {
  // hide all sections first
  document.querySelectorAll(".section-content").forEach((el) => {
    el.style.display = "none";
  });

  if (!section) return;

  // Mapping for grouped sections
  const groups = {
    intro: ["intro"],
    rules: ["rules"],
    awards: ["awards-criteria"],
    resources: ["handbook-proposal"],
    submissions: ["submissions"],
  };

  // If the requested section matches a group key, show all members of that group.
  if (groups[section]) {
    groups[section].forEach((id) => {
      const el = document.getElementById(`section-${id}`);
      if (el) el.style.display = "block";
    });
    return;
  }

  // Otherwise, treat it as a single section id.
  const target = document.getElementById(`section-${section}`);
  if (target) target.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const sec = getQueryParam("section");
  // default to intro if none provided
  showSection(sec || "intro");

  // --- Competition PDF uploader (posts base64 JSON to Google Apps Script) ---
  // NOTE: deploy your Apps Script web app and paste its URL below
  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyt_V1p7ec877kTbx5szkVD8gs1LMey0AMm0MNl2aVPZMjftXB0W8gHLJYI9VB7riML/exec"; // e.g. https://script.google.com/macros/s/XXXXX/exec

  const submissionForm = document.getElementById("submission-form");
  if (!submissionForm) return;

  submissionForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const grade = document.getElementById("grade").value;
    const email = document.getElementById("studentEmail").value.trim();
    const description = document.getElementById("description").value.trim();
    const fileInput = document.getElementById("proposalPdf");
    const submitBtn = submissionForm.querySelector("button[type=submit]");
    const statusEl = document.getElementById("submission-status");

    function setStatus(state, message) {
      if (!statusEl) return;
      statusEl.classList.remove("loading", "success", "error", "invalid");
      statusEl.innerHTML = "<br>";
      clearTimeout(statusEl._resetTimer);

      if (state === "loading") {
        statusEl.classList.add("loading");
        statusEl.textContent = message || "Loading...";
        submitBtn.disabled = true;
        return;
      }

      if (state === "success") {
        statusEl.classList.add("success");
        statusEl.textContent = message || "Success";
        submissionForm.reset();
        // keep success visible briefly then restore blank line
        statusEl._resetTimer = setTimeout(() => {
          statusEl.classList.remove("success");
          statusEl.innerHTML = "<br>";
          submitBtn.disabled = false;
        }, 3500);
        return;
      }

      if (state === "invalid") {
        statusEl.classList.add("invalid");
        statusEl.textContent = message || "Invalid input";
        statusEl._resetTimer = setTimeout(() => {
          statusEl.classList.remove("invalid");
          statusEl.innerHTML = "<br>";
        }, 3500);
        return;
      }

      // error
      statusEl.classList.add("error");
      statusEl.textContent = message || "Error";
      statusEl._resetTimer = setTimeout(() => {
        statusEl.classList.remove("error");
        statusEl.innerHTML = "<br>";
        submitBtn.disabled = false;
      }, 3500);
    }

    // simple email validation
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !grade || !email || !description) {
      setStatus("invalid", "Please fill in all required fields.");
      return;
    }

    if (!emailValid) {
      setStatus("invalid", "Please enter a valid email address.");
      return;
    }

    if (!fileInput || !fileInput.files.length) {
      setStatus("invalid", "Please attach your PDF proposal.");
      return;
    }

    const file = fileInput.files[0];
    if (file.type !== "application/pdf") {
      setStatus("invalid", "File must be a PDF.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setStatus("invalid", "File must be smaller than 10 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result;
      const base64 = dataUrl.split(",")[1];

      const payload = {
        name,
        grade,
        email,
        description,
        filename: file.name,
        fileData: base64,
      };

      try {
        setStatus("loading", "Loading...");
        const resp = await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        const json = await resp.json().catch(() => ({}));
        if (resp.ok && json.success) {
          setStatus("success", "Success");
        } else {
          console.error(json);
          setStatus(
            "error",
            json && json.message
              ? json.message
              : "Submission failed — try again.",
          );
        }
      } catch (err) {
        console.error(err);
        setStatus("error", "Submission failed — try again later.");
      }
    };

    reader.readAsDataURL(file);
  });
});
