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
    document.querySelectorAll('.top, .bottom, .random').forEach(button => {
      button.classList.add('disabled');
      button.style.pointerEvents = 'none'; // Prevent clicking
    });
  };

  const enableButtons = () => {
    document.querySelectorAll('.top, .bottom, .random').forEach(button => {
      button.classList.remove('disabled');
      button.style.pointerEvents = ''; // Re-enable clicking
    });
  };

  const smoothScrollToWithHeaderAdjustment = (imageElement) => {
    if (!imageElement) return;

    // Disable buttons before starting the scroll
    disableButtons();

    // Scroll immediately without smooth behavior to prevent ease-in
    imageElement.scrollIntoView({ behavior: 'auto' });  // No ease-in, no smooth scroll

    // Apply header adjustment with smooth scroll after it's in view
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          window.scrollBy({
            top: -55,
            behavior: 'smooth'  // Smooth adjustment after the initial fast scroll
          });

          // Re-enable buttons after the smooth scroll adjustment is done
          setTimeout(enableButtons, 300);  // Delay based on the smooth scroll duration
        }, 200);
        observer.disconnect();
      }
    }, { threshold: 1.0 });

    observer.observe(imageElement);
  };

  // Function to handle the smooth scroll
  const smoothScrollTo = (element) => {
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth' });

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();  // Disconnect the observer once the element is in view
      }
    }, { threshold: 1.0 });

    observer.observe(element);
  };

  // Add event listeners to both the <a> and the <div>
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
    smoothScrollToWithHeaderAdjustment(randomPostProfileImage);  // No ease-in when the random button is clicked
  });

  // Allow clicks on the <div> to also trigger the <a>
  document.querySelectorAll('.top, .bottom, .random, .years').forEach(function(div) {
    div.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') {
        const link = div.querySelector('a');  // Find the <a> inside the div
        if (link) {
          link.click();  // Simulate a click on the link
        }
      }
    });
  });

  // Ensure that the .years <a> links navigate and scroll to top of new page
  document.querySelectorAll('.years a').forEach(function(yearLink) {
    yearLink.addEventListener('click', function() {
      window.scrollTo(0, 0);  // Ensure that the new page starts from the top
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
