/*
 * ARTI service worker foundation.
 *
 * Step 01 installs the worker and activates it immediately, but performs no
 * caching and intercepts no requests. This reserves the offline and push
 * pipeline for a later step without changing behaviour in any way: every
 * request still goes straight to the network.
 */

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
