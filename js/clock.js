/* ============================================================
   CLOCK MODULE
   Manages time display and ID generation
   ============================================================ */

/**
 * Generate a random hex-style Prescript ID
 */
export function generatePrescriptId() {
  const hex = () => Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  return `ID: ${hex()}-${hex()}`;
}

/**
 * Update the timestamp in the meta bar
 */
export function updateClock(dom) {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  dom.metaTime.textContent = `${h}:${m}:${s}`;
}

/**
 * Start the clock ticker
 */
export function startClockTicker(dom) {
  setInterval(() => updateClock(dom), 1000);
  updateClock(dom); // Run immediately on load
}
