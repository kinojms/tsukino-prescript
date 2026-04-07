/* ============================================================
   MAIN MODULE
   Entry point: initialization and event handling
   ============================================================ */

import { CONFIG } from './config.js';
import { initializeDom } from './dom.js';
import { state } from './state.js';
import { startClockTicker, updateClock } from './clock.js';
import { clearAnimationTimers, runCipherAnimation } from './animation.js';
import { getRandomPreScript } from './prescripts.js';
import {
  setLoadingState,
  showError,
  updateComplianceBar,
  updatePrescriptCounter,
  showComplianceWarning,
  updateReceiveButtonState,
} from './ui.js';
import { initNotifications } from './notifications.js';
import { initTasks } from './tasks-ui.js';

// DOM references (will be initialized on page load)
let dom;
const STORAGE_KEY = 'index-prescript-daily-usage';

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function loadDailyUsage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const today = getTodayDate();
  if (!raw) return { date: today, count: 0 };

  try {
    const parsed = JSON.parse(raw);
    if (parsed?.date === today && typeof parsed.count === 'number') {
      return parsed;
    }
  } catch (err) {
    console.warn('[INDEX TERMINAL] Failed to parse daily usage', err);
  }

  return { date: today, count: 0 };
}

function saveDailyUsage(count) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    date: getTodayDate(),
    count,
  }));
}

function resetDailyUsageIfNeeded() {
  const today = getTodayDate();
  if (state.dailyDate !== today) {
    state.dailyDate = today;
    state.dailyUsed = 0;
    saveDailyUsage(0);
  }
}


/**
 * Main function: retrieves a random prescript and animates it onto the screen.
 */
async function fetchPrescript() {
  if (state.isLoading) return;  // Guard: prevent double-clicks
  resetDailyUsageIfNeeded();

  if (state.dailyUsed >= CONFIG.dailyLimit) {
    showError('DAILY PRESCRIPT LIMIT REACHED — RESETS TOMORROW.', dom);
    updateReceiveButtonState(dom);
    return;
  }

  // Clear any previous animation
  clearAnimationTimers();

  setLoadingState(true, dom);

  try {
    // ── Retrieve Random Prescript ──────────────────────────────
    const prescriptMessage = getRandomPreScript();

    if (!prescriptMessage) {
      throw new Error('Prescript archive is empty.');
    }

    // ── Success: Run animation ────────────────────────────────
    setLoadingState(false, dom);

    // Increment session counter and daily counter
    state.prescriptsReceived++;
    state.dailyUsed++;
    saveDailyUsage(state.dailyUsed);
    updatePrescriptCounter(dom);
    updateReceiveButtonState(dom);

    // Show compliance warning after first prescript
    showComplianceWarning(dom);

    // Update compliance bar
    updateComplianceBar(dom);

    // Run the cipher → reveal animation with actual text
    runCipherAnimation(prescriptMessage, dom);

  } catch (err) {
    console.error('[INDEX TERMINAL] Transmission error:', err);
    setLoadingState(false, dom);
    showError(`RELAY ERROR: ${err.message || 'Unknown signal interference.'}`, dom);
  }
}

/**
 * Initialize the application
 */
function init() {
  // Cache DOM elements
  dom = initializeDom();
  const dailyUsage = loadDailyUsage();
  state.dailyDate = dailyUsage.date;
  state.dailyUsed = dailyUsage.count;

  // Set the initial clock
  updateClock(dom);
  startClockTicker(dom);

  // Subtle entrance: fade in the button label after a brief pause
  setTimeout(() => {
    dom.btnReceive.style.opacity = '1';
  }, 300);

  // Set initial counters and button state
  updatePrescriptCounter(dom);
  updateReceiveButtonState(dom);

  // Initialize notifications
  initNotifications();

  // Initialize tasks
  initTasks(dom);

  // Attach event listeners
  dom.btnReceive.addEventListener('click', fetchPrescript);

  // Keyboard shortcut: press Enter to receive a prescript
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !state.isLoading) {
      fetchPrescript();
    }
  });

  console.log(
    '%c[ THE INDEX — PRESCRIPT TERMINAL ACTIVE ]',
    'color: #00f3ff; background: #000; font-family: monospace; font-size: 13px; padding: 4px 10px;'
  );
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('[INDEX TERMINAL] Service Worker registered:', registration);
      })
      .catch((error) => {
        console.log('[INDEX TERMINAL] Service Worker registration failed:', error);
      });
  });
}
