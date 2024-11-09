document.addEventListener('DOMContentLoaded', function () {
  const headerFollow = document.querySelector('.header-follow');
  const header = document.querySelector('.header');

  if (headerFollow && header) {
    const followHeight = headerFollow.offsetHeight;
    header.style.height = `${followHeight}px`;
  }

  const maxTweetElement = document.querySelector('meta[name="maxTweetIndex"]');
  const maxTweetIndex = maxTweetElement ? parseInt(maxTweetElement.getAttribute('content'), 10) : 3251;

  const savedScrollPosition = localStorage.getItem('scrollPosition');
  if (savedScrollPosition) {
    window.scrollTo(0, parseInt(savedScrollPosition, 10));
  }

  window.addEventListener('beforeunload', function () {
    localStorage.setItem('scrollPosition', window.scrollY);
  });

  const getRandomPostProfileWithImage = () => {
    let randomIndex, tweetElement, postProfileImage;

    do {
      randomIndex = Math.floor(Math.random() * (maxTweetIndex + 1));
      const randomTweetClass = `.tweet-${String(randomIndex).padStart(4, '0')}`;
      tweetElement = document.querySelector(randomTweetClass);

      if (tweetElement) {
        postProfileImage = tweetElement.querySelector('.post-profile img');
      }

    } while (!postProfileImage);

    return postProfileImage;
  };

  const disableButtons = () => {
    document.querySelectorAll('.top, .bottom, .random, .random-mobile').forEach(button => {
      button.classList.add('disabled');
      button.style.pointerEvents = 'none';
    });
  };

  const enableButtons = () => {
    document.querySelectorAll('.top, .bottom, .random, .random-mobile').forEach(button => {
      button.classList.remove('disabled');
      button.style.pointerEvents = '';
    });
  };

  const smoothScrollToWithHeaderAdjustment = (imageElement) => {
    if (!imageElement) return;

    disableButtons();

    imageElement.scrollIntoView({ behavior: 'auto' });

    // Media query check for coarse pointer and screen width <= 671px
    const isCoarsePointerAndNarrowScreen = window.matchMedia('(pointer: coarse) and (max-width: 671px)').matches;
    const offset = isCoarsePointerAndNarrowScreen ? -13 : -55;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          window.scrollBy({
            top: offset,
            behavior: 'smooth'
          });
          setTimeout(enableButtons, 300);
        }, 200);
        observer.disconnect();
      }
    }, { threshold: 1.0 });

    observer.observe(imageElement);
  };

  const smoothScrollTo = (element) => {
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth' });

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
      }
    }, { threshold: 1.0 });

    observer.observe(element);
  };

  // Add event listeners to buttons in .mobile-nav
  document.querySelector('.mobile-nav a[href="#top"]').addEventListener('click', function (e) {
    e.preventDefault();
    smoothScrollTo(document.querySelector('#top'));
  });

  document.querySelector('.mobile-nav a[href="#bottom"]').addEventListener('click', function (e) {
    e.preventDefault();
    smoothScrollTo(document.querySelector('#bottom'));
  });

  document.querySelector('.mobile-nav a.random-mobile').addEventListener('click', function (e) {
    e.preventDefault();
    const randomPostProfileImage = getRandomPostProfileWithImage();
    smoothScrollToWithHeaderAdjustment(randomPostProfileImage);
  });

  document.querySelector('.top').addEventListener('click', function (e) {
    e.preventDefault();
    smoothScrollTo(document.querySelector('#top'));
  });

  document.querySelector('.bottom').addEventListener('click', function (e) {
    e.preventDefault();
    smoothScrollTo(document.querySelector('#bottom'));
  });

  document.querySelector('.random').addEventListener('click', function (e) {
    e.preventDefault();
    const randomPostProfileImage = getRandomPostProfileWithImage();
    smoothScrollToWithHeaderAdjustment(randomPostProfileImage);
  });

  document.querySelectorAll('.top, .bottom, .random, .years').forEach(function(div) {
    div.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') {
        const link = div.querySelector('a');
        if (link) {
          link.click();
        }
      }
    });
  });

  document.querySelectorAll('.years a').forEach(function(yearLink) {
    yearLink.addEventListener('click', function() {
      window.scrollTo(0, 0);
    });
  });
});

document.querySelector('.header-follow').addEventListener('click', function() {
  window.scrollTo(0, 0);
});

let isCopying = false;

document.querySelector('.footer').addEventListener('click', function(event) {
  if (isCopying) return;
  isCopying = true;

  const copyText = document.querySelector('.copy').textContent;

  navigator.clipboard.writeText(copyText).then(function() {
    const copiedMessage = document.createElement('div');
    copiedMessage.textContent = 'Copied!';
    copiedMessage.classList.add('copied-message');
    document.body.appendChild(copiedMessage);

    copiedMessage.style.left = event.pageX + 'px';
    copiedMessage.style.top = event.pageY + 'px';
    copiedMessage.style.opacity = '1';

    setTimeout(function() {
      copiedMessage.style.opacity = '0';
      setTimeout(function() {
        document.body.removeChild(copiedMessage);
        isCopying = false;
      }, 200);
    }, 400);
  }).catch(function() {
    console.error('Failed to copy text: ', copyText);
    isCopying = false;
  });
});
