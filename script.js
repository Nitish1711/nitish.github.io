// Enhanced floating particles background animation with interactive elements
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let particles = [];
let mouse = { x: null, y: null };

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  particles = Array.from({length: 100}, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 3 + 1,
    d: Math.random() * 2 + 0.5,
    color: `hsl(${Math.random() * 60 + 180}, 100%, 70%)`, // Cyan to blue hues
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  }));
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    // Update position
    p.x += p.vx;
    p.y += p.vy;

    // Bounce off edges
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    // Mouse interaction
    if (mouse.x && mouse.y) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        p.x -= dx * 0.01;
        p.y -= dy * 0.01;
      }
    }

    // Draw particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = p.color;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  requestAnimationFrame(animate);
}
animate();

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Morphing text effect
function morphText(element, texts, interval = 3000) {
  let textIndex = 0;
  setInterval(() => {
    element.style.opacity = 0;
    setTimeout(() => {
      element.textContent = texts[textIndex];
      element.style.opacity = 1;
      textIndex = (textIndex + 1) % texts.length;
    }, 500);
  }, interval);
}

// Apply morphing to hero title
const heroTitle = document.querySelector('.morphing-text');
if (heroTitle) {
  const originalText = heroTitle.textContent;
  morphText(heroTitle, [
    "I help founders turn ideas into seamless digital experiences",
    "I craft innovative solutions with cutting-edge technology",
    "I build scalable applications that drive business growth"
  ]);
}

// Typing effect for glitch text
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Apply typing effect to new tag
const newTag = document.querySelector('.new-tag');
if (newTag) {
  setTimeout(() => {
    typeWriter(newTag, "🚀 Next Ventures is live!");
  }, 1000);
}

// Parallax effect for planet glow
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const glow = document.querySelector('.planet-glow');
  if (glow) {
    glow.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Skill hover effects
document.querySelectorAll('.skill-item').forEach(skill => {
  skill.addEventListener('mouseenter', () => {
    skill.style.animation = 'pulse 1s infinite';
  });
  skill.addEventListener('mouseleave', () => {
    skill.style.animation = '';
  });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const bg = card.querySelector('.project-bg');
    if (bg) {
      bg.style.transform = 'scale(1.05)';
    }
  });
  card.addEventListener('mouseleave', () => {
    const bg = card.querySelector('.project-bg');
    if (bg) {
      bg.style.transform = 'scale(1)';
    }
  });
});

// Form submission with email
document.querySelector('.contact-form form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const message = form.querySelector('textarea').value;

  const subject = encodeURIComponent(`Message from ${name} - Portfolio Contact`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  window.location.href = `mailto:nitishmahajan121212@gmail.com?subject=${subject}&body=${body}`;
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateCounter(stat, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(stats => {
  statsObserver.observe(stats);
});

// Enhanced floating elements
function createFloatingElements() {
  const heroVisual = document.querySelector('.hero-visual');
  if (!heroVisual) return;

  for (let i = 0; i < 5; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.left = Math.random() * 100 + '%';
    element.style.top = Math.random() * 100 + '%';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = (Math.random() * 10 + 10) + 's';
    heroVisual.appendChild(element);
  }
}
createFloatingElements();

// Typing effect for name
let nameTyped = false;
function typeName(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      nameTyped = true;
    }
  }
  setTimeout(type, 500);
}

const nameElement = document.querySelector('.name');
if (nameElement) {
  setTimeout(() => {
    typeName(nameElement, "Nitish Mahajan");
  }, 1000);
}



// Matrix rain effect (subtle)
function createMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.1';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const matrix = "01";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];

  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ffff';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = matrix[Math.floor(Math.random() * matrix.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 35);
}
createMatrixRain();

// Rotating banner images
const images = [
  "https://camo.githubusercontent.com/f91ef3273f042115348db5e3500451e0237bbf2231acaa92afbee90219051044/68747470733a2f2f6173736574732e636362702e696e2f66726f6e74656e642f636f6e74656e742f72656163742d6a732f636173682d7769746864726177616c2d6f75747075742d76322e676966",
  "https://camo.githubusercontent.com/3bde6ec22392c0a85daa78279411dec9b79eda59b19f470482bb281844a372bc/68747470733a2f2f6173736574732e636362702e696e2f66726f6e74656e642f636f6e74656e742f72656163742d6a732f676f6f676c652d7365617263682d73756767657374696f6e732d6f75747075742e676966",
  "https://camo.githubusercontent.com/454f1129f2a8e164821bdd509e0de5ec25f5474145e2e68b64bf22c4c8a5f0ae/68747470733a2f2f6173736574732e636362702e696e2f66726f6e74656e642f636f6e74656e742f72656163742d6a732d686f6f6b732f6e6f7465732d6170702d6f75747075742e676966",
  "https://camo.githubusercontent.com/84b7d6751523f28b8c0aaa24dc2b4512dc0ac4775d14da97c72fe13d4c81197a/68747470733a2f2f6173736574732e636362702e696e2f66726f6e74656e642f636f6e74656e742f72656163742d6a732d686f6f6b732f70617373776f72642d76616c696461746f722d6f75747075742d76302e676966",
  "https://camo.githubusercontent.com/dbe00f791706ab6bec4563338b85fde9667677f3bf12238aabd028685246c8cd/68747470733a2f2f6173736574732e636362702e696e2f66726f6e74656e642f636f6e74656e742f72656163742d6a732f73746f7077617463682d6f75747075742d76322e676966",
  "https://camo.githubusercontent.com/0c2939f5b9c53abb2c1a1e71fa743b7a9888fcab4332ef058e427b66f63d268f/68747470733a2f2f6173736574732e636362702e696e2f66726f6e74656e642f636f6e74656e742f72656163742d6a732f6469676974616c2d74696d65722d6f75747075742e676966",
  "https://camo.githubusercontent.com/b414a22ac022413c13c2a9cb3c029939296c986168d887cd46c1b2890bf8d63a/68747470733a2f2f6173736574732e636362702e696e2f66726f6e74656e642f636f6e74656e742f72656163742d6a732f636c69636b2d636f756e7465722d6f75747075742e676966"
];

let currentImageIndex = 0;
const rotatingImage = document.getElementById('rotating-image');

function rotateImage() {
  rotatingImage.style.opacity = 0;
  setTimeout(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    rotatingImage.src = images[currentImageIndex];
    rotatingImage.style.opacity = 1;
  }, 500);
}

setInterval(rotateImage, 8000); // Rotate every 8 seconds

// Add CSS for animate-in class and additional styles
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    animation: fadeInUp 1s ease-out;
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  .floating-element {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #00ffff;
    border-radius: 50%;
    animation: floatRandom 15s infinite linear;
    box-shadow: 0 0 10px #00ffff;
  }
  @keyframes floatRandom {
    0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
  }
  .hero-intro .name {
    overflow: hidden;
    white-space: nowrap;
    border-right: 3px solid #00ffff;
    animation: blink 1s infinite;
  }
  @keyframes blink {
    0%, 50% { border-color: #00ffff; }
    51%, 100% { border-color: transparent; }
  }
`;
document.head.appendChild(style);
