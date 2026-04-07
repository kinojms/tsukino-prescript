/* ============================================================
   CIPHER BACKGROUND MODULE
   Generates and animates constantly shuffling cipher text
   ============================================================ */

const CIPHER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
const COLUMNS = 80;  // Characters per line
const ROWS = 50;     // Number of lines
const UPDATE_INTERVAL = 50;  // ms between updates

let animationFrame;
let cipherText = '';
let dom;

/**
 * Generate random cipher character
 */
function getRandomChar() {
  return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
}

/**
 * Generate initial cipher text grid
 */
function generateCipherText() {
  let text = '';
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      text += getRandomChar();
    }
    text += '\n';
  }
  return text;
}

/**
 * Update cipher text with random changes
 */
function updateCipherText() {
  if (!dom?.cipherBackground) return;

  // Create array of characters for easier manipulation
  const chars = cipherText.split('');

  // Randomly change some characters (about 5% per update)
  const changes = Math.floor(chars.length * 0.05);
  for (let i = 0; i < changes; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    // Skip newlines
    if (chars[randomIndex] !== '\n') {
      chars[randomIndex] = getRandomChar();
    }
  }

  cipherText = chars.join('');
  dom.cipherBackground.textContent = cipherText;
}

/**
 * Start cipher background animation
 */
export function startCipherAnimation() {
  if (animationFrame) return; // Already running

  cipherText = generateCipherText();

  // Start update loop
  function animate() {
    updateCipherText();
    animationFrame = setTimeout(animate, UPDATE_INTERVAL);
  }

  animate();
}

/**
 * Stop cipher background animation
 */
export function stopCipherAnimation() {
  if (animationFrame) {
    clearTimeout(animationFrame);
    animationFrame = undefined;
  }
}

/**
 * Initialize cipher background
 */
export function initCipherBackground(domRefs) {
  dom = domRefs;
  dom.cipherBackground = document.getElementById('cipher-background');

  if (dom.cipherBackground) {
    startCipherAnimation();
  }
}