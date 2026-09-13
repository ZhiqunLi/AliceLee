(function () {
  "use strict";

  var welcomeText =
    "Welcome! I am a 2025 Fall Economic PhD Student at Ohio State University. I’m interested in how intimate relationships are formed, formalized, dissolved, and re-formed under preferences, information, institutions, and household investments?";

  var backgrounds = [
    { url: "/AliceLee/images/background_picture1.JPEG", position: "60% center" },
    { url: "/AliceLee/images/background_picture2.JPEG", position: "50% center" },
    { url: "/AliceLee/images/background_picture3.JPEG", position: "52% center" }
  ];

  function initializeApprovedStories() {
    var hero = document.querySelector("#home.hero-section");
    var description = hero && hero.querySelector('[data-animation="description"]');

    if (!hero || !description) {
      return;
    }

    description.textContent = welcomeText;

    var slideContainer = document.createElement("div");
    slideContainer.className = "hero-background-slides";
    slideContainer.setAttribute("aria-hidden", "true");

    var slides = backgrounds.map(function (background, index) {
      var slide = document.createElement("div");
      slide.className = "hero-background-slide" + (index === 0 ? " is-active" : "");
      slide.style.backgroundImage = 'url("' + background.url + '")';
      slide.style.backgroundPosition = background.position;
      slide.dataset.backgroundIndex = String(index + 1);
      slideContainer.appendChild(slide);
      return slide;
    });

    hero.prepend(slideContainer);

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      return;
    }

    var activeIndex = 0;
    window.setInterval(function () {
      slides[activeIndex].classList.remove("is-active");
      activeIndex = (activeIndex + 1) % slides.length;
      slides[activeIndex].classList.add("is-active");
    }, 6000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApprovedStories, { once: true });
  } else {
    initializeApprovedStories();
  }
})();
