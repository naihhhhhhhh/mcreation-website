/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
  e.preventDefault();

  // serviceID - templateID - #form - publicKey
  emailjs.sendForm('service_54dkp8j', 'template_uapep5e', '#contact-form', '5oQsosiv4KWBBx6nQ')
    .then(() => {
      // Show sent message
      contactMessage.textContent = 'Message sent successfully ✅';

      // Remove message after five seconds
      setTimeout(() => {
        contactMessage.textContent = '';
      }, 5000);

      // Clear input fields
      contactForm.reset();
    }, () => {
      // Show error message
      contactMessage.textContent = 'Message not sent (service error) ❌';
    });
};

contactForm.addEventListener('submit', sendEmail);


/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 350 viewport height, add the class
  window.scrollY >= 350
    ? scrollUp.classList.add('show-scroll')
    : scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp);


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 58,
          sectionId = current.getAttribute('id'),
          sectionsClass = document.querySelector('.nav__list a[href*=' + sectionId + ']');

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link');
    } else {
      sectionsClass.classList.remove('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive);


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
  reset: true // ← animations replay on each reveal
});

function revealGallery() {
  sr.reveal('.gallery__media, .gallery__video', {
    scale: 0.9,
    interval: 100,
    delay: 400
  });
}

/*=============== DOM CONTENT LOADED ===============*/
document.addEventListener('DOMContentLoaded', () => {
  // 1) Lazy-load + responsive srcset for all gallery images
  document.querySelectorAll('.gallery__media').forEach(img => {
    if (img.tagName.toLowerCase() === 'img') {
      img.loading = 'lazy';
      const full  = img.src;
      const thumb = full.replace(/\/([^\/]+)$/, '/thumbs/$1');
      img.srcset = `${thumb} 800w, ${full} 1600w`;
      img.sizes  = '(max-width: 600px) 100vw, 200px';
    }
  });

  // 2) Initial ScrollReveal on everything
  revealGallery();

  // 3) Filter buttons → toggle galleries
  const filterButtons = document.querySelectorAll('.filter-button');
  const galleries     = document.querySelectorAll('.company-gallery');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      galleries.forEach(g => g.classList.remove('active'));
      btn.classList.add('active');
      document
        .querySelectorAll(`.company-gallery[data-company="${btn.dataset.company}"]`)
        .forEach(g => g.classList.add('active'));
      revealGallery(); // re-animate newly visible items
    });
  });

  // 4) Image-only Lightbox (not for video thumbs)
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  document.querySelectorAll('.gallery__media').forEach(el => {
    // Only add the lightbox event for IMG elements (not for DIVs, which are video thumbs)
    if (el.tagName.toLowerCase() === 'img') {
      el.addEventListener('click', () => {
        lightboxImg.src = el.src;
        lightbox.classList.add('active');
      });
    }
  });
  document.querySelector('.lightbox-close').addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });

  // 5) Scroll-Up button (unchanged)
  const scrollUpEl = document.getElementById('scroll-up');
  window.addEventListener('scroll', () => {
    window.scrollY >= 350
      ? scrollUpEl.classList.add('show-scroll')
      : scrollUpEl.classList.remove('show-scroll');
  });

});
document.querySelectorAll('.video-item').forEach(item => {
  item.addEventListener('click', () => {
    const src   = item.querySelector('video').getAttribute('src');
    const title = item.dataset.title;
    // fill modal
    document.getElementById('modal-video-player').src         = src;
    document.getElementById('modal-video-title').textContent  = title;
    // show modal
    document.getElementById('video-modal').style.display     = 'flex';
  });
});

// close button
document.querySelector('.modal-close').addEventListener('click', () => {
  const modal = document.getElementById('video-modal');
  modal.style.display = 'none';
  modal.querySelector('video').src = ''; // stop playback
});

// click outside content to close
document.getElementById('video-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    e.currentTarget.style.display = 'none';
    e.currentTarget.querySelector('video').src = '';
  }
});
