// Smooth Scroll for Navbar Links
document.querySelectorAll('a.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Fade-in on Scroll
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));

// Floating Stars Background
const canvas = document.createElement('canvas');
canvas.id = "stars-canvas";
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.3 + 0.05
    });
  }
}
createStars(120);

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(animateStars);
}
animateStars();
// Navbar scroll background
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".cosmic-navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Countdown Timer
const eventDate = new Date("2025-12-01T09:00:00").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}, 1000);

window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});
const hoverSound = document.getElementById("hoverSound");
const humSound = document.getElementById("humSound");

// set volume
humSound.volume = 0.3;
hoverSound.volume = 0.6;

// browsers block autoplay — wait for any interaction
function startHum() {
  if (humSound.paused) {
    humSound.play().catch(err => {
      console.log("Autoplay blocked:", err);
    });
  }
}

// listen for first interaction
["click", "keydown", "scroll"].forEach(evt => {
  document.addEventListener(evt, startHum, { once: true });
});

// hover whoosh sound
document.querySelectorAll(".btn, .cosmic-link").forEach(el => {
  el.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });
});
