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
});
