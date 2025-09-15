// 🎆 Fireworks Setup
const canvas = document.createElement('canvas');
canvas.id = 'fireworks';
canvas.style = 'position:fixed;top:0;left:0;pointer-events:none;z-index:999;';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = random(2, 4);
    this.speed = random(2, 10);
    this.angle = random(0, 2 * Math.PI);
    this.life = 100;
  }
  update() {
    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;
    this.x += vx;
    this.y += vy;
    this.life--;
  }
  draw() {
    ctx.beginPath();
    ctx.globalAlpha = this.life / 100;
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

let particles = [];

function explode(x, y) {
  const colors = ['#ff69b4', '#ffd700', '#87cefa', '#ff4500'];
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.life <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

window.addEventListener('resize', () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
});

// 🔥 Optional: global explode trigger
window.triggerFireworks = () => {
  explode(w / 2, h / 2);
}

