(function () {
  "use strict";

  var socialLinks = [
    {
      key: "linkedin",
      href: "https://www.linkedin.com/in/zhiqun-li-677258295/",
      label: "LinkedIn",
      iconClass: "fab fa-linkedin-in text-2xl"
    },
    {
      key: "github",
      href: "https://github.com/ZhiqunLi/ZhiqunLi",
      label: "GitHub",
      iconClass: "fab fa-github text-2xl"
    },
    {
      key: "bookings",
      href: "https://outlook.office.com/book/MeetingwithZhiqun@buckeyemail.osu.edu/?ismsaljsauthenabled",
      label: "Book a meeting with Zhiqun Li"
    }
  ];

  function createIconLink(linkDefinition) {
    var link = document.createElement("a");
    link.href = linkDefinition.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "hero-social-link";
    link.dataset.storyLink = linkDefinition.key;
    link.setAttribute("aria-label", linkDefinition.label);
    link.title = linkDefinition.label;

    if (linkDefinition.key === "bookings") {
      var bookingsIcon = document.createElement("span");
      bookingsIcon.className = "hero-bookings-icon";
      bookingsIcon.setAttribute("aria-hidden", "true");

      var microsoftIcon = document.createElement("i");
      microsoftIcon.className = "fab fa-microsoft";
      var calendarIcon = document.createElement("i");
      calendarIcon.className = "fas fa-calendar-check";

      bookingsIcon.appendChild(microsoftIcon);
      bookingsIcon.appendChild(calendarIcon);
      link.appendChild(bookingsIcon);
    } else {
      var icon = document.createElement("i");
      icon.className = linkDefinition.iconClass;
      icon.setAttribute("aria-hidden", "true");
      link.appendChild(icon);
    }

    return link;
  }

  function initializeApprovedStories() {
    var hero = document.querySelector("#home.hero-section");
    if (!hero || hero.dataset.approvedStories36 === "true") {
      return;
    }

    var socialContainer = hero.querySelector('[data-animation="social"] > div');
    if (!socialContainer) {
      return;
    }

    socialContainer.classList.remove("space-x-4");
    socialContainer.classList.add("hero-social-links");
    socialLinks.forEach(function (linkDefinition) {
      socialContainer.appendChild(createIconLink(linkDefinition));
    });

    hero.dataset.approvedStories36 = "true";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApprovedStories, { once: true });
  } else {
    initializeApprovedStories();
  }
})();
