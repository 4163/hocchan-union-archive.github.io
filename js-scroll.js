// Smooth scrolling for the a elements with the id pageTop
document.querySelectorAll('#pageTop').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
		e.preventDefault(); // Prevent the default anchor click behavior

		// Set body overflow to hidden
		document.body.style.overflow = 'hidden';

		// Smooth scroll to the top of the page
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
});

const pageTop = document.getElementById('pageTop');

let isFooterVisible = false;

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			isFooterVisible = true;
			pageTop.classList.add('pageTopActive');
			console.log('Footer is visible');
		} else {
			isFooterVisible = false;
		}
	});
});

function togglePageTop() {
	if (isFooterVisible) {
		// Do nothing if the footer is visible
		return;
	}
	if (window.scrollY > 100) {
		pageTop.classList.add('pageTopActive');
	} else {
		pageTop.classList.remove('pageTopActive');
		document.body.style.removeProperty('overflow');
	}
}

// Initial check to set visibility based on starting position
togglePageTop();

// Add scroll event listener
window.addEventListener('scroll', togglePageTop);

// Select the footer element
const footer = document.querySelector('footer');

// Observe the footer element
if (footer) {
	observer.observe(footer);
}