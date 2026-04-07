/* ============================================================
   DOM REFERENCES MODULE
   Caches all DOM elements used throughout the app
   ============================================================ */

export function initializeDom() {
  return {
    prescriptText:      document.getElementById('prescript-text'),
    btnReceive:         document.getElementById('btn-receive'),
    statusText:         document.getElementById('status-text'),
    statusDot:          document.getElementById('status-dot'),
    complianceFill:     document.getElementById('compliance-fill'),
    compliancePct:      document.getElementById('compliance-pct'),
    complianceWarning:  document.getElementById('compliance-warning'),
    prescriptCounter:   document.getElementById('prescript-counter'),
    errorMsg:           document.getElementById('error-msg'),
    metaId:             document.getElementById('meta-id'),
    metaTime:           document.getElementById('meta-time'),
    message1:           document.getElementById('message1'),
    message2:           document.getElementById('message2'),
    // Tasks elements
    tasksList:          document.getElementById('tasks-list'),
    tasksStats:         document.getElementById('tasks-stats'),
    // Prescript action buttons
    prescriptActions:   document.getElementById('prescript-actions'),
    prescriptDoneBtn:   document.getElementById('prescript-done-btn'),
    prescriptFailedBtn: document.getElementById('prescript-failed-btn'),
    // Cipher background
    cipherBackground:   document.getElementById('cipher-background'),
  };
}
