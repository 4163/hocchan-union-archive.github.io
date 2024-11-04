document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");

  const h1Element = document.querySelector("a.HU");
  if (!h1Element) {
    console.warn("No 'HU' element");
    return;
  }

  const toggleButton = document.createElement("div");
  toggleButton.style.backgroundColor = "transparent";
  toggleButton.style.height = "55px";
  toggleButton.style.position = "fixed";
  toggleButton.style.top = 0;
  toggleButton.style.right = 0;
  toggleButton.style.cursor = "pointer";
  toggleButton.style.zIndex = "1000";
  toggleButton.classList.add("sf-hidden");

  document.body.appendChild(toggleButton);
  console.log("Button appended");

  function createLine(topPosition) {
    const line = document.createElement("div");
    line.style.width = "25px";
    line.style.height = "2px";
    line.style.backgroundColor = "#373737";
    line.style.position = "absolute";
    line.style.top = `${topPosition}px`;
    line.style.right = "20px";
    line.style.transition = "opacity 0.3s, transform 0.3s ease";
    return line;
  }

  const line1 = createLine(20);
  const line2 = createLine(28);
  const line3 = createLine(36);

  toggleButton.appendChild(line1);
  toggleButton.appendChild(line2);
  toggleButton.appendChild(line3);
  console.log("Lines added");

  const line4 = document.createElement("div");
  line4.style.width = "25px";
  line4.style.height = "2px";
  line4.style.backgroundColor = "#373737";
  line4.style.position = "absolute";
  line4.style.top = "27px";
  line4.style.right = "20px";
  line4.style.transform = "rotate(-45deg)";
  line4.style.opacity = "0";

  const line5 = document.createElement("div");
  line5.style.width = "25px";
  line5.style.height = "2px";
  line5.style.backgroundColor = "#373737"; // Minami color lol, Minaminaminami
  line5.style.position = "absolute";
  line5.style.top = "27px";
  line5.style.right = "20px";
  line5.style.transform = "rotate(45deg)";
  line5.style.opacity = "0";

  toggleButton.appendChild(line4);
  toggleButton.appendChild(line5);

  function updateButtonWidth() {
    const h1RightEdge = h1Element.getBoundingClientRect().right;
    const viewportWidth = window.innerWidth;
    const buttonWidth = viewportWidth - h1RightEdge - 15;
    toggleButton.style.width = `${buttonWidth}px`;
    console.log(`Button width: ${buttonWidth}px`);
  }

  function updateButtonVisibility() {
    const navMobile = document.querySelector("nav.nav-mobile");

    if (window.innerWidth <= 768) {
      toggleButton.classList.remove("sf-hidden");
      updateButtonWidth();

      if (navMobile) {
        // Restore the nav-mobile state when returning to small screen
        navMobile.style.visibility = navMobileState.visibility;
        navMobile.style.opacity = navMobileState.opacity;
      }
    } else {
      toggleButton.classList.add("sf-hidden");

      if (navMobile) {
        // Clear nav-mobile visibility and opacity for larger screens
        navMobile.style.visibility = "";
        navMobile.style.opacity = "";
      }
    }
  }

  // Store nav-mobile initial state for small screen restoration
  const navMobile = document.querySelector("nav.nav-mobile");
  const navMobileState = {
    visibility: navMobile ? navMobile.style.visibility || "hidden" : "hidden",
    opacity: navMobile ? navMobile.style.opacity || "0" : "0",
  };

  updateButtonVisibility();
  window.addEventListener("resize", () => {
    updateButtonVisibility();
    if (window.innerWidth <= 768) {
      updateButtonWidth();
    }
  });

  let navOpen = false;
  let isAnimating = false;

  toggleButton.addEventListener("click", () => {
    if (isAnimating) {
      console.log("Animation in progress, ignoring click.");
      return;
    }

    isAnimating = true;
    if (navMobile) {
      navOpen = !navOpen;
      navMobile.style.visibility = navOpen ? "visible" : "hidden";
      navMobile.style.opacity = navOpen ? "1" : "0";

      // Update stored navMobileState to remember current state
      navMobileState.visibility = navMobile.style.visibility;
      navMobileState.opacity = navMobile.style.opacity;

      line1.style.transition = "transform 0.3s ease, top 0.3s ease, right 0.3s ease";
      line3.style.transition = "transform 0.3s ease, top 0.3s ease, right 0.3s ease, transform-origin 0.3s ease";

      if (navOpen) {
        line1.style.top = "18px";
        line1.style.right = "24px";
        line1.style.transformOrigin = "top right";
        line1.style.transform = "rotate(-45deg)";
        line3.style.top = "36px";
        line3.style.right = "-2px";
        line3.style.transformOrigin = "left";
        line3.style.transform = "rotate(-135deg)";
        line2.style.opacity = "0";

        setTimeout(() => {
          line1.style.opacity = "0";
          line3.style.opacity = "0";
          line4.style.opacity = "1";
          line5.style.opacity = "1";
        }, 300);
      } else {
        line1.style.top = "20px";
        line1.style.right = "20px";
        line1.style.transformOrigin = "top right";
        line1.style.transform = "rotate(0deg)";
        line3.style.top = "36px";
        line3.style.right = "20px";
        line3.style.transformOrigin = "left";
        line3.style.transform = "rotate(0deg)";
        line2.style.opacity = "1";

        line4.style.opacity = "0";
        line5.style.opacity = "0";
        line1.style.opacity = "1";
        line3.style.opacity = "1";
      }

      console.log(`Nav ${navOpen ? "visible" : "hidden"}`);
    } else {
      console.warn("No 'nav-mobile'");
    }

    setTimeout(() => {
      isAnimating = false;
    }, 300);
  });
});
