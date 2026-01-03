// service-worker.js

const CACHE_NAME = 'smarttransit-cache-v1';
// This list should include all the files that make up your app's "shell".
// For this single-page app, it's mainly the HTML file itself.
const urlsToCache = [
  '/',
  'index.html', // Assuming your HTML file is named index.html
];

// 1. Install the service worker and cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Intercept network requests and serve from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the request is in the cache, return it
        if (response) {
          return response;
        }
        // Otherwise, try to fetch it from the network
        return fetch(event.request);
      })
  );
});