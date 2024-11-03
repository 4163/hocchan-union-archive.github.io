document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  // Select the <a> element with class "HU"
  const h1Element = document.querySelector("a.HU");
  if (!h1Element) {
    console.warn("No element with class 'HU' found.");
    return;
  }

  // Create the toggle button (transparent background)
  const toggleButton = document.createElement("div");
  toggleButton.style.backgroundColor = "transparent"; // No color
  toggleButton.style.height = "55px";
  toggleButton.style.position = "fixed";
  toggleButton.style.top = 0;
  toggleButton.style.right = 0;
  toggleButton.style.cursor = "pointer";
  toggleButton.style.zIndex = "1000";
  toggleButton.classList.add("sf-hidden");

  // Append the toggle button to the body
  document.body.appendChild(toggleButton);
  console.log("Transparent toggle button created and appended to the body");

  // Create the icon overlay div
  const iconOverlay = document.createElement("div");
  iconOverlay.style.width = "25px";
  iconOverlay.style.height = "20px";
  iconOverlay.style.backgroundImage = "url('images/nav.png')";
  iconOverlay.style.backgroundSize = "cover";
  iconOverlay.style.position = "absolute";
  iconOverlay.style.top = "19px"; // Set top to 19px as requested
  iconOverlay.style.right = "15px";
  iconOverlay.style.transition = "opacity 0.2s"; // Smooth transition for opacity

  // Append the icon overlay to the toggle button
  toggleButton.appendChild(iconOverlay);
  console.log("Icon overlay added on top of the toggle button");

  // Function to update the button's width
  function updateButtonWidth() {
    const h1RightEdge = h1Element.getBoundingClientRect().right;
    const viewportWidth = window.innerWidth;
    const buttonWidth = viewportWidth - h1RightEdge - 15; // Subtract 15 pixels

    toggleButton.style.width = `${buttonWidth}px`;
    console.log(`Button width updated to ${buttonWidth}px`);
  }

  // Function to update the button's visibility and width based on screen size
  function updateButtonVisibility() {
    if (window.innerWidth <= 768) {
      console.log("Screen width is 768px or less - showing button");
      toggleButton.classList.remove("sf-hidden");
      updateButtonWidth(); // Update width for small screens
    } else {
      console.log("Screen width is greater than 768px - hiding button");
      toggleButton.classList.add("sf-hidden");
    }
  }

  // Initial visibility and width update, add resize event listener
  updateButtonVisibility();
  window.addEventListener("resize", () => {
    updateButtonVisibility();
    if (window.innerWidth <= 768) {
      updateButtonWidth();
    }
  });

  // Track whether the nav is open or closed
  let navOpen = false;

  // Handle button click to show/hide nav and toggle icon image
  toggleButton.addEventListener("click", () => {
    const navMobile = document.querySelector("nav.nav-mobile");
    if (navMobile) {
      navOpen = !navOpen;
      navMobile.style.visibility = navOpen ? "visible" : "hidden";
      navMobile.style.opacity = navOpen ? "1" : "0";
      
      // Change the icon based on nav state
      iconOverlay.style.opacity = "0"; // Fade out before changing the icon
      setTimeout(() => {
        iconOverlay.style.backgroundImage = navOpen ? "url('images/x.png')" : "url('images/nav.png')";
        iconOverlay.style.opacity = "1"; // Fade back in
      }, 200); // Delay matches the transition duration

      console.log(`Toggled nav visibility to ${navOpen ? "visible" : "hidden"}`);
    } else {
      console.warn("No element with class 'nav-mobile' found.");
    }
  });
});
