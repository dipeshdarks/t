const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const container = document.querySelector('.container');

// Get a safe position where the No button won't escape or overlap
function getSafePosition(button, avoidElement, padding = 20) {
  const btnWidth = button.offsetWidth;
  const btnHeight = button.offsetHeight;

  const winW = window.innerWidth;
  const winH = window.innerHeight;

  const avoidRect = avoidElement.getBoundingClientRect();
  let x, y;
  let tries = 0;

  do {
    x = Math.floor(Math.random() * (winW - btnWidth - padding));
    y = Math.floor(Math.random() * (winH - btnHeight - padding));
    tries++;
  } while (
    x < avoidRect.left + avoidRect.width &&
    x + btnWidth > avoidRect.left &&
    y < avoidRect.top + avoidRect.height &&
    y + btnHeight > avoidRect.top &&
    tries < 100
  );

  return { x, y };
}

// Move the No button to a safe, random position
function moveNoButton() {
  const { x, y } = getSafePosition(noBtn, container);
  noBtn.style.transition = 'top 0.25s ease, left 0.25s ease';
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.classList.add('shake');
  setTimeout(() => noBtn.classList.remove('shake'), 300);
}

// Disable joke on touch devices
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

if (!isTouchDevice()) {
  noBtn.addEventListener('mouseover', moveNoButton);
  noBtn.addEventListener('click', moveNoButton);
} else {
  noBtn.disabled = true;
  noBtn.style.opacity = 0.6;
  noBtn.innerText = "Try on desktop!";
}

// Yes button alert
document.getElementById('yesBtn').addEventListener('click', () => {
  alert("You said YES! 🎉");
});
