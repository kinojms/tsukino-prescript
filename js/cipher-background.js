/* ============================================================
   CIPHER BACKGROUND MODULE
   Generates and animates constantly shuffling cipher text
   ============================================================ */

const CIPHER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
const MIN_COLUMNS = 40;
const MIN_ROWS = 20;
const UPDATE_INTERVAL = 50;  // ms between updates

let animationFrame;
let cipherText = '';
let dom;
let resizeTimeout;

/**
 * Generate random cipher character
 */
function getRandomChar() {
  return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
}

/**
 * Measure a single character cell inside the cipher background.
 */
function getCharSize() {
  const ruler = document.createElement('span');
  const styles = window.getComputedStyle(dom.cipherBackground);
  ruler.style.position = 'absolute';
  ruler.style.visibility = 'hidden';
  ruler.style.whiteSpace = 'pre';
  ruler.style.font = styles.font;
  ruler.textContent = 'M';
  document.body.appendChild(ruler);
  const rect = ruler.getBoundingClientRect();
  document.body.removeChild(ruler);
  return { width: rect.width || 10, height: rect.height || 18 };
}

/**
 * Calculate grid dimensions based on the viewport and current font size.
 */
function getGridDimensions() {
  const rect = dom.cipherBackground.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) {
    return { columns: 80, rows: 50 };
  }

  const charSize = getCharSize();
  const columns = Math.max(MIN_COLUMNS, Math.floor(rect.width / charSize.width));
  const rows = Math.max(MIN_ROWS, Math.floor(rect.height / charSize.height));
  return { columns, rows };
}

/**
 * Generate initial cipher text grid
 */
function generateCipherText() {
  const { columns, rows } = getGridDimensions();
  let text = '';

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      text += getRandomChar();
    }
    if (row < rows - 1) {
      text += '\n';
    }
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

  console.log('[CIPHER] Starting cipher animation');
  cipherText = generateCipherText();
  console.log('[CIPHER] Generated initial cipher text, length:', cipherText.length);

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
    console.log('[CIPHER] Initializing cipher background animation');
    startCipherAnimation();

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!dom?.cipherBackground) return;
        cipherText = generateCipherText();
        dom.cipherBackground.textContent = cipherText;
      }, 120);
    });
  } else {
    console.warn('[CIPHER] Cipher background element not found');
  }
}