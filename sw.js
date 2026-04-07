// Service Worker for PWA functionality
const CACHE_NAME = 'prescript-terminal-v1';
const urlsToCache = [
  '/',
  './index.html',
  './css/style.css',
  './js/main.js',
  './js/config.js',
  './js/prescripts.js',
  './js/state.js',
  './js/dom.js',
  './js/clock.js',
  './js/animation.js',
  './js/audio.js',
  './js/ui.js',
  './manifest.json',
  './assets/images/index-logo.png',
  './assets/audio/index_message_1.wav',
  './assets/audio/index_message_2.wav'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Background sync for notifications (limited PWA support)
self.addEventListener('sync', (event) => {
  if (event.tag === 'prescript-notification') {
    event.waitUntil(sendPrescriptNotification());
  }
});

// Push notifications (requires server setup)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New prescript from The Index',
    icon: './assets/images/index-logo.png',
    badge: './assets/images/index-logo.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'view',
        title: 'View Prescript'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('The Index', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

async function sendPrescriptNotification() {
  // This would be called periodically to send notifications
  // Limited by PWA background processing constraints
  const prescripts = [
    "Step outside. Observe the sky for 5 minutes.",
    "Cease all screen time. Drink water.",
    "Document one victory from today.",
    // ... more prescripts
  ];

  const randomPrescript = prescripts[Math.floor(Math.random() * prescripts.length)];

  const options = {
    body: randomPrescript,
    icon: './assets/images/index-logo.png',
    badge: './assets/images/index-logo.png',
    vibrate: [200, 100, 200],
    tag: 'prescript-daily',
    requireInteraction: true
  };

  return self.registration.showNotification('The Index — Prescript', options);
}