document.addEventListener('DOMContentLoaded', function () {
    const tweetContainers = document.querySelectorAll('.post-contents, .tweet-contents, .profile, .banner');
    const currentPage = window.location.pathname;

    tweetContainers.forEach(tweet => {
        const mediaContent = tweet.querySelector('.media-content');
        const interactions = tweet.querySelector('.interactions');

        if (mediaContent && interactions) {
            const commentCount = interactions.querySelector('.comment a').textContent.trim();
            const retweetCount = interactions.querySelector('.retweet a').textContent.trim();
            const likeCount = interactions.querySelector('.like a').textContent.trim();

            mediaContent.querySelectorAll('img').forEach(img => {
                img.addEventListener('click', function () {
                    if (!document.querySelector('.lightbox-overlay')) {
                        createLightbox(img, commentCount, retweetCount, likeCount);
                        saveLightboxState(currentPage, img.src, commentCount, retweetCount, likeCount);
                        preventScroll(true); 
                    }
                });
            });
        }

        // Check for images inside profile and banner containers
        if (tweet.classList.contains('profile') || tweet.classList.contains('banner')) {
            tweet.querySelectorAll('img').forEach(img => {
                img.addEventListener('click', function () {
                    if (!document.querySelector('.lightbox-overlay')) {
                        createLightbox(img, '', '', ''); // Empty interactions for profile/banner
                        preventScroll(true);
                    }
                });
            });
        }
    });

    const storedLightbox = localStorage.getItem(`lightboxState_${currentPage}`);
    if (storedLightbox) {
        const { imgSrc, commentCount, retweetCount, likeCount } = JSON.parse(storedLightbox);
        const img = new Image();
        img.src = imgSrc;
        createLightbox(img, commentCount, retweetCount, likeCount);
        preventScroll(true);
    }

    function createLightbox(img, commentCount, retweetCount, likeCount) {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox-overlay');
        
        lightbox.addEventListener('click', function (event) {
            if (event.target === lightbox) {
                closeLightbox(lightbox);
            }
        });

        const lightboxImage = document.createElement('img');
        lightboxImage.src = img.src;
        lightboxImage.classList.add('lightbox-image');
        lightbox.appendChild(lightboxImage);

        const interactionsContainer = document.createElement('div');
        interactionsContainer.classList.add('js-interactions');

        if (commentCount || retweetCount || likeCount) {
            const commentBox = createInteractionBox('svg/comment-twitter-icon-white.svg', '💬', commentCount, 'js-comments');
            const spacing1 = createSpacing();
            const retweetBox = createInteractionBox('svg/Ei-retweet-white.svg', '🔁', retweetCount, 'js-retweets');
            const spacing2 = createSpacing();
            const likeBox = createInteractionBox('svg/heart-white.svg', '❤', likeCount, 'js-likes');

            interactionsContainer.appendChild(commentBox);
            interactionsContainer.appendChild(spacing1);
            interactionsContainer.appendChild(retweetBox);
            interactionsContainer.appendChild(spacing2);
            interactionsContainer.appendChild(likeBox);

            spacing1.addEventListener('click', function () {
                closeLightbox(lightbox);
            });

            spacing2.addEventListener('click', function () {
                closeLightbox(lightbox);
            });
        }

        lightbox.appendChild(interactionsContainer);

        const closeButton = document.createElement('button');
        closeButton.classList.add('lightbox-close-button');
        closeButton.addEventListener('click', function () {
            closeLightbox(lightbox);
        });

        lightbox.appendChild(closeButton);

        document.body.appendChild(lightbox);
    }

    function closeLightbox(lightbox) {
        document.body.removeChild(lightbox);
        preventScroll(false);
        clearLightboxState();
    }

    function preventScroll(prevent) {
        document.body.style.overflow = prevent ? 'hidden' : '';
    }

    function createInteractionBox(iconSrc, altText, count, className) {
        const interactionBox = document.createElement('div');
        interactionBox.classList.add(className);

        const link = document.createElement('a');
        link.classList.add('interaction-link');

        const iconWrapper = document.createElement('span');
        iconWrapper.classList.add('interaction-icon-wrapper');

        const icon = document.createElement('img');
        icon.src = iconSrc;
        icon.alt = altText;
        icon.classList.add('interaction-icon');
        iconWrapper.appendChild(icon);

        const interactionText = document.createElement('span');
        interactionText.textContent = ` ${count}`;

        link.appendChild(iconWrapper);
        link.appendChild(interactionText);
        interactionBox.appendChild(link);

        interactionBox.addEventListener('mouseenter', function () {
            link.classList.add('hovered');
            iconWrapper.classList.add('hover-circle');
            icon.classList.add('hover-icon');
        });

        interactionBox.addEventListener('mouseleave', function () {
            link.classList.remove('hovered');
            iconWrapper.classList.remove('hover-circle');
            icon.classList.remove('hover-icon');
        });

        return interactionBox;
    }

    function createSpacing() {
        const spacing = document.createElement('div');
        spacing.classList.add('js-spacing');
        return spacing;
    }

    function saveLightboxState(page, imgSrc, commentCount, retweetCount, likeCount) {
        const lightboxState = { imgSrc, commentCount, retweetCount, likeCount };
        localStorage.setItem(`lightboxState_${page}`, JSON.stringify(lightboxState));
    }

    function clearLightboxState() {
        localStorage.removeItem(`lightboxState_${currentPage}`);
    }
});