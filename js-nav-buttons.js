const buttonData = [
    {
        image: "home.png",
        link: "index.html",
        baseColor: "#69c3c8",
        hoverColor: "#b9b48c"
    },
    {
        image: "e_hocchan_union_archive.png",
        link: "[E：]  Hocchan Union Archive.html",
        baseColor: "#69c3c8",
        hoverColor: "#b9b48c"
    },
    {
        image: "h_hocchan_union_archive.png",
        link: "[H：]  Hocchan Union Archive.html",
        baseColor: "#69c3c8",
        hoverColor: "#b9b48c"
    },
];

function getImagePath(fileName) {
    const currentPath = window.location.pathname;
    const isSubdirectory = currentPath.includes('/html/') && currentPath.split('/html/')[1].includes('/');
    return isSubdirectory ? `../images/${fileName}` : `images/${fileName}`;
}

function getLinkPath(link) {
    const currentPath = window.location.pathname;
    const isSubdirectory = currentPath.includes('/html/') && currentPath.split('/html/')[1].includes('/');
    return isSubdirectory ? `../${link}` : link;
}

function preloadHoverImages() {
    buttonData.forEach(data => {
        const hoverImage = new Image();
        const hoverImagePath = getImagePath(data.image).replace('.png', '_on.png');
        hoverImage.src = hoverImagePath;
    });
}

preloadHoverImages();

const container = document.createElement('div');
document.body.appendChild(container);

container.style.position = 'fixed';
container.style.left = '14px';
container.style.top = '4px';  // Start at top 4px
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.zIndex = '1000';

// Smooth scroll function
function smoothScrollToBottom(targetPosition, duration) {
    const startPosition = parseInt(container.style.top, 10);
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function animation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Ensure we don't go beyond 1
        const easeInOutQuad = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress; // Easing function for smooth animation
        const newPosition = startPosition + distance * easeInOutQuad;

        container.style.top = `${newPosition}px`;

        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            // Once animation is complete, set bottom
            container.style.top = ''; // Clear top positioning
            container.style.bottom = '14px'; // Move to bottom with a margin
        }
    }

    requestAnimationFrame(animation);
}

// Move container smoothly after 200ms
setTimeout(() => {
    smoothScrollToBottom(window.innerHeight - 14 - container.offsetHeight, 500); // Set target position
}, 200);

function createButton(imageSrc, linkHref, baseColor, hoverColor) {
    const anchor = document.createElement('a');
    anchor.href = getLinkPath(linkHref);
    anchor.style.textDecoration = 'none';
    anchor.style.display = 'block';

    const button = document.createElement('div');
    button.style.width = '225px';
    button.style.height = '36.75px';
    button.style.borderRadius = '18.38px';
    button.style.marginTop = '10px';
    button.style.position = 'relative';
    button.style.cursor = 'pointer';
    button.style.overflow = 'hidden';
    button.style.backgroundColor = baseColor;
    button.style.transition = 'background-color 0.3s ease';
    button.style.border = '2px solid #46a2a7'; // Added border

    const normalImg = document.createElement('img');
    const imagePath = getImagePath(imageSrc);
    normalImg.src = imagePath;
    normalImg.style.width = '100%';
    normalImg.style.height = '100%';
    normalImg.style.position = 'absolute';
    normalImg.style.top = '0';
    normalImg.style.left = '0';
    normalImg.style.transition = 'opacity 0.3s ease';

    const hoverImageSrc = imagePath.replace('.png', '_on.png');

    const hoverImg = document.createElement('img');
    hoverImg.src = hoverImageSrc;
    hoverImg.style.width = '100%';
    hoverImg.style.height = '100%';
    hoverImg.style.position = 'absolute';
    hoverImg.style.top = '0';
    hoverImg.style.left = '0';
    hoverImg.style.opacity = '0';
    hoverImg.style.transition = 'opacity 0.3s ease';

    button.appendChild(normalImg);
    button.appendChild(hoverImg);

    button.addEventListener('mouseover', () => {
        hoverImg.style.opacity = '1';
        button.style.backgroundColor = hoverColor;
    });

    button.addEventListener('mouseout', () => {
        hoverImg.style.opacity = '0';
        button.style.backgroundColor = baseColor;
    });

    anchor.appendChild(button);
    container.appendChild(anchor);
}

buttonData.forEach(data => {
    createButton(data.image, data.link, data.baseColor, data.hoverColor);
});
