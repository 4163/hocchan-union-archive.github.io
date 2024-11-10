// Smooth scrolling for the a elements with the id pageTop
document.querySelectorAll('#pageTop').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default anchor click behavior

        // Smooth scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Only hide the button on touch devices after a delay
        if (window.matchMedia('(pointer: coarse)').matches) {
            setTimeout(() => {
                const pageTop = document.getElementById('pageTop'); // Ensure the element is correctly referenced
                pageTop.style.display = 'none';
            }, 650); // Delay before hiding
        }
    });
});

const pageTop = document.getElementById('pageTop');

// Set initial styles
pageTop.style.opacity = '0';
pageTop.style.pointerEvents = 'none';  // Prevent clicks when hidden
pageTop.style.transition = 'opacity 0.2s'; // Smooth transition for fade effect

// Variable to track whether the timer should run
let hideTimer = null;

// Function to check scroll position and fade in/out
function togglePageTop() {
    if (window.scrollY <= 100) {
        // Fade out, disable clicks, and hide when within 100px from the top
        pageTop.style.opacity = '0';
        pageTop.style.pointerEvents = 'none';

        // Start a timer to hide the button only if the scroll position is at the top
        if (hideTimer === null) {
            hideTimer = setTimeout(() => {
                pageTop.style.display = 'none';  // Hide the button after the delay
            }, 1000); // Set the delay for hiding the button
        }
    } else {
        // Show the button if scrolled further than 100px
        pageTop.style.display = 'block';
        pageTop.style.opacity = '1';
        pageTop.style.pointerEvents = 'auto';

        // Clear the timer if the scroll is not at the top
        if (hideTimer !== null) {
            clearTimeout(hideTimer);
            hideTimer = null;
        }
    }
}

// Initial check to set visibility based on starting position
togglePageTop();

// Add scroll event listener
window.addEventListener('scroll', togglePageTop);
