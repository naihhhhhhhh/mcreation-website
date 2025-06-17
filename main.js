import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js';
import {
  getDatabase,
  ref,
  push
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js';

// ————— Your Firebase config (include your real databaseURL) —————
const firebaseConfig = {
  apiKey: 'AIzaSyA1OABMeAuq2-WjDjZp9xxdoBauPB2zFfU',
  authDomain: 'mcreationweb-sendmessage.firebaseapp.com',
  databaseURL: 'https://mcreationweb-sendmessage-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'mcreationweb-sendmessage',
  storageBucket: 'mcreationweb-sendmessage.firebasestorage.app',
  messagingSenderId: '878047124839',
  appId: '1:878047124839:web:4fb9e63d1c50365421e3c2',
  measurementId: 'G-95TZR46F30'
};

// ————— Initialize Firebase & get a ref —————
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, 'contact_messages');

// ————— Hook up your contact form —————
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // stop the browser nav

  const name = contactForm.user_name.value.trim();
  const email = contactForm.user_email.value.trim();
  const message = contactForm.user_message.value.trim();

  if (!name || !email || !message) {
    contactMessage.textContent = 'Please fill out all fields ❌';
    return;
  }

  try {
    await push(messagesRef, {
      name,
      email,
      message,
      timestamp: Date.now()
    });
    contactMessage.textContent = 'Message saved! ✅';
    contactForm.reset();
    setTimeout(() => (contactMessage.textContent = ''), 5000);
  } catch (err) {
    console.error('Firebase write failed:', err);
    contactMessage.textContent = 'Failed to send message ❌';
  }
});


/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 350 viewport height, add the class
  this.scrollY >= 350
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
  // reset: true, // Animations repeat
});

// Existing reveals
sr.reveal(`.perfil, .contact__form`);
sr.reveal(`.info`, { origin: 'left', delay: 800 });
sr.reveal(`.skills`, { origin: 'left', delay: 1000 });
sr.reveal(`.about`, { origin: 'right', delay: 1200 });
sr.reveal(`.projects__card, .services__card, .experience__card`, { interval: 100 });

// New reveals for gallery content and images:
sr.reveal(`.gallery__content`, { origin: 'bottom', distance: '40px', delay: 300 });
sr.reveal(`.gallery__img`, { scale: 0.85, interval: 100, delay: 400 });



document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stats__number");
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    const duration = 1500;        // total animation duration (ms)
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      counter.textContent = current >= target ? target : current;
      if (current >= target) clearInterval(timer);
    }, stepTime);
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
