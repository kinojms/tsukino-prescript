/* ============================================================
   UI MODULE
   Handles UI state changes and updates
   ============================================================ */

import { CONFIG } from './config.js';
import { state } from './state.js';
import { scrambledString } from './animation.js';
import { playMessageSequence } from './audio.js';
import { generatePrescriptId } from './clock.js';

/**
 * Sets UI into "loading" mode: disables button, updates status.
 */
export function setLoadingState(isLoading, dom) {
  state.isLoading = isLoading;
  dom.btnReceive.disabled = isLoading;
  updateReceiveButtonState(dom);

  if (isLoading) {
    dom.statusText.textContent = 'TRANSMITTING...';
    dom.statusDot.style.animation = 'pulse-dot 0.4s ease-in-out infinite';
    dom.errorMsg.classList.remove('visible');
    dom.prescriptText.classList.add('decoding');

    // Update meta bar with new transmission ID
    dom.metaId.textContent = generatePrescriptId();

    // Play the initial message sound and schedule the looping sound
    playMessageSequence(dom);

    // Kick off the cipher scramble immediately (with placeholder length)
    dom.prescriptText.textContent = scrambledString(80);

  } else {
    dom.statusText.textContent = 'SIGNAL RECEIVED';
    dom.statusDot.style.animation = 'pulse-dot 2s ease-in-out infinite';
  }
}

/**
 * Shows an error message in the UI.
 */
export function showError(message, dom) {
  dom.prescriptText.classList.remove('decoding');
  dom.prescriptText.textContent = 'SIGNAL LOST — RETRY TRANSMISSION.';
  dom.errorMsg.textContent = message;
  dom.errorMsg.classList.add('visible');
  dom.statusText.textContent = 'TRANSMISSION FAILED';
}

/**
 * Updates the compliance bar to a random "high compliance" score.
 */
export function updateComplianceBar(dom) {
  const score = Math.floor(Math.random() * 27) + 72;
  dom.complianceFill.style.width = `${score}%`;
  dom.compliancePct.textContent  = `${score}%`;
}

export function updateReceiveButtonState(dom) {
  dom.btnReceive.disabled = state.isLoading || state.dailyUsed >= CONFIG.dailyLimit;
}

/**
 * Updates the prescript counter display
 */
export function updatePrescriptCounter(dom) {
  dom.prescriptCounter.textContent =
    `PRESCRIPTS RECEIVED THIS SESSION: ${state.prescriptsReceived} · TODAY: ${state.dailyUsed}/${CONFIG.dailyLimit}`;
}

/**
 * Shows the compliance warning message
 */
export function showComplianceWarning(dom) {
  dom.complianceWarning.classList.add('visible');
}
