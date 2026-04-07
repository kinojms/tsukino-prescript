/* ============================================================
   ANIMATION MODULE
   Cipher animation engine and text reveal logic
   ============================================================ */

import { CONFIG } from './config.js';
import { state } from './state.js';

/**
 * Returns a random character from CONFIG.cipherChars
 */
function randomChar() {
  return CONFIG.cipherChars[Math.floor(Math.random() * CONFIG.cipherChars.length)];
}

/**
 * Builds a scrambled string of `length` random cipher chars.
 */
export function scrambledString(length) {
  return Array.from({ length }, randomChar).join('');
}

/**
 * Clears any running cipher/reveal timers.
 */
export function clearAnimationTimers() {
  if (state.cipherInterval !== null) {
    clearInterval(state.cipherInterval);
    state.cipherInterval = null;
  }
  if (state.revealTimeout !== null) {
    clearTimeout(state.revealTimeout);
    state.revealTimeout = null;
  }
  if (state.message2Interval !== null) {
    clearInterval(state.message2Interval);
    state.message2Interval = null;
  }
}

/**
 * Runs the full cipher → reveal animation sequence.
 * @param {string} finalText - The actual prescript message to reveal.
 * @param {Object} dom - DOM element references
 */
export function runCipherAnimation(finalText, dom) {
  const textEl = dom.prescriptText;

  // Strip to plain text length for the scramble width
  const targetLen = finalText.length;

  // Mark element as "decoding" for CSS glow intensification
  textEl.classList.add('decoding');

  // ── Phase 1: Cipher Scramble ──────────────────────────────
  // Rapidly replace content with random characters
  state.cipherInterval = setInterval(() => {
    textEl.textContent = scrambledString(targetLen);
  }, CONFIG.cipherInterval);

  // After cipherDuration, stop scramble and begin reveal
  setTimeout(() => {
    clearInterval(state.cipherInterval);
    state.cipherInterval = null;

    // ── Phase 2: Letter-by-letter Reveal ─────────────────────
    textEl.classList.remove('decoding');

    let revealed = 0;    // How many chars have been shown so far

    function revealNextChar() {
      if (revealed > targetLen) {
        // All characters revealed — add blinking cursor
        textEl.innerHTML =
          finalText + '<span class="cursor-blink" aria-hidden="true"></span>';
        // Stop the overlapping reveal sounds
        if (state.message2Interval !== null) {
          clearInterval(state.message2Interval);
          state.message2Interval = null;
        }
        return;
      }

      // Show revealed portion + cipher noise for remainder
      const done  = finalText.slice(0, revealed);
      const noise = scrambledString(Math.max(0, targetLen - revealed));
      textEl.textContent = done + noise;

      revealed++;

      // Schedule next character reveal
      state.revealTimeout = setTimeout(
        revealNextChar,
        CONFIG.revealCharDelay
      );
    }

    revealNextChar();

  }, CONFIG.cipherDuration);
}
