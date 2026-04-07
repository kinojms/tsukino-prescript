/* ============================================================
   NOTIFICATIONS MODULE
   Handles PWA notifications and scheduling
   ============================================================ */

import { getRandomPreScript } from './prescripts.js';

/**
 * Request notification permission from user
 */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.warn('[INDEX TERMINAL] This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

/**
 * Send a prescript notification
 */
export async function sendPrescriptNotification() {
  if (Notification.permission !== 'granted') {
    return;
  }

  const prescript = getRandomPreScript();

  const options = {
    body: prescript,
    icon: './assets/images/index-logo.png',
    badge: './assets/images/index-logo.png',
    vibrate: [200, 100, 200],
    tag: 'prescript-daily',
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'View in App'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };

  const notification = new Notification('The Index — Prescript', options);

  // Auto-close after 10 seconds
  setTimeout(() => {
    notification.close();
  }, 10000);

  return notification;
}

/**
 * Schedule random notifications throughout the day
 * Note: This is limited by browser constraints - notifications only work when page is open
 */
export function scheduleDailyNotifications() {
  // Clear any existing intervals
  if (window.prescriptNotificationInterval) {
    clearInterval(window.prescriptNotificationInterval);
  }

  // Schedule notifications every 2-4 hours randomly
  const scheduleNextNotification = () => {
    const delay = (2 + Math.random() * 2) * 60 * 60 * 1000; // 2-4 hours in milliseconds

    window.prescriptNotificationInterval = setTimeout(async () => {
      await sendPrescriptNotification();
      scheduleNextNotification(); // Schedule the next one
    }, delay);
  };

  // Start the first notification
  scheduleNextNotification();
}

/**
 * Initialize notifications on app start
 */
export async function initNotifications() {
  const permissionGranted = await requestNotificationPermission();

  if (permissionGranted) {
    console.log('[INDEX TERMINAL] Notifications enabled');
    // Note: In a real PWA, we'd use background sync or push notifications
    // For now, notifications only work when the app is open
    scheduleDailyNotifications();
  } else {
    console.log('[INDEX TERMINAL] Notifications disabled');
  }
}