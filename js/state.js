/* ============================================================
   STATE MANAGEMENT MODULE
   Centralized application state
   ============================================================ */

export const state = {
  prescriptsReceived: 0,   // Session counter
  dailyUsed: 0,            // Daily prescript counter
  isLoading: false,         // Guard against double-clicks
  cipherInterval: null,     // setInterval handle for cipher loop
  revealTimeout: null,      // setTimeout handle for reveal loop
  message2Interval: null,   // setInterval handle for overlapping message2
};
