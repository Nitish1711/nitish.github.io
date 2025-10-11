const typingText = ["Hey There! I'm Nitish Mahajan 🚀", "Full Stack Developer | AI Enthusiast", "Building Scalable Microservices & Dashboards"];
let i = 0;
let charIndex = 0;
const typingSpeed = 100;
const typingElement = document.getElementById('typing');

function type() {
  if (charIndex < typingText[i].length) {
    typingElement.textContent += typingText[i].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = typingText[i].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, typingSpeed / 2);
  } else {
    i = (i + 1) % typingText.length;
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", type);
