(function () {
  "use strict";

  var storageKey = "darkMode";
  var root = document.documentElement;

  function storedPreference() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function persistPreference(isDark) {
    try {
      window.localStorage.setItem(storageKey, String(isDark));
    } catch (error) {
      // The current page still changes theme when storage is unavailable.
    }
  }

  function updateButtons() {
    var isDark = root.classList.contains("dark");
    document.querySelectorAll(".theme-toggle").forEach(function (button) {
      button.setAttribute("aria-pressed", String(isDark));
      button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      button.title = isDark ? "Switch to light mode" : "Switch to dark mode";
    });
  }

  function setTheme(isDark, persist) {
    root.classList.toggle("dark", isDark);
    if (persist) {
      persistPreference(isDark);
    }
    updateButtons();
  }

  function createToggle() {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";

    var moon = document.createElement("i");
    moon.className = "fas fa-moon theme-icon theme-icon-moon";
    moon.setAttribute("aria-hidden", "true");

    var sun = document.createElement("i");
    sun.className = "fas fa-sun theme-icon theme-icon-sun";
    sun.setAttribute("aria-hidden", "true");

    button.appendChild(moon);
    button.appendChild(sun);
    button.addEventListener("click", function () {
      setTheme(!root.classList.contains("dark"), true);
    });
    return button;
  }

  function initializeThemeToggle() {
    // Light mode is the default for first-time visitors. A saved manual
    // preference still takes priority, so dark mode remains fully available.
    setTheme(storedPreference() === "true", false);

    document.querySelectorAll('nav [data-animation="social"]').forEach(function (container) {
      if (!container.querySelector(".theme-toggle")) {
        container.appendChild(createToggle());
      }
    });
    updateButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeThemeToggle, { once: true });
  } else {
    initializeThemeToggle();
  }
})();
