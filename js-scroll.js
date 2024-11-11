// Smooth scrolling for the a elements with the id pageTop
document.querySelectorAll('#pageTop').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default anchor click behavior

        // Smooth scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

const pageTop = document.getElementById('pageTop');

// Set initial styles
pageTop.style.opacity = '0';
pageTop.style.pointerEvents = 'none';  // Prevent clicks when hidden
pageTop.style.transition = 'opacity 0.2s'; // Smooth transition for fade effect

// Function to check scroll position and fade in/out
function togglePageTop() {
    if (window.scrollY <= 100) {
        // Fade out and disable clicks when within 120px from the top
        pageTop.style.opacity = '0';
        pageTop.style.pointerEvents = 'none';  // Disable clicks
    } else {
        // Fade in and enable clicks when further than 120px from the top
        pageTop.style.opacity = '1';
        pageTop.style.pointerEvents = 'auto';  // Enable clicks
    }
}

// Initial check to set visibility based on starting position
togglePageTop();

// Add scroll event listener
window.addEventListener('scroll', togglePageTop);
