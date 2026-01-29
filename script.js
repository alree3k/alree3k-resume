const sections = document.querySelectorAll("[data-section]");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let opened = new Set();

sections.forEach(section => {
  section.querySelector(".section-title").addEventListener("click", () => {
    section.classList.toggle("open");
    opened.add(section);

    if (opened.size === sections.length) {
      startConfetti();
    }
  });
});

/* SIMPLE CONFETTI */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiParticles = [];

function startConfetti() {
  for (let i = 0; i < 150; i++) {
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      dy: Math.random() * 3 + 1
    });
  }
  requestAnimationFrame(draw);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiParticles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${Math.random() * 360},100%,50%)`;
    ctx.fill();
    p.y += p.dy;
  });
  requestAnimationFrame(draw);
}
sections.forEach(section => {
  section.querySelector(".section-title").addEventListener("mousedown", () => {
    section.querySelector(".section-title").style.transform = "scale(0.98)";
  });

  section.querySelector(".section-title").addEventListener("mouseup", () => {
    section.querySelector(".section-title").style.transform = "";
  });
});

// ---------- Professional Floating Dots Background ----------
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Create particles
class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.5 + 0.5;       // small dots
    this.speedY = Math.random() * 0.2 + 0.05;      // slow downward
    this.speedX = Math.random() * 0.1 - 0.05;     // slight horizontal drift
    this.opacity = Math.random() * 0.5 + 0.3;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y > canvas.height) this.y = 0;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "white";
    ctx.fill();
  }
}

const particles = [];
const NUM_PARTICLES = 120;

for (let i = 0; i < NUM_PARTICLES; i++) {
  particles.push(new Particle());
}

// Animate
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Optional: subtle gradient overlay
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'rgba(13,17,23,0.2)');
  gradient.addColorStop(1, 'rgba(22,27,34,0.2)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();
