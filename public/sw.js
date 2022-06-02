self.addEventListener('install', function (event) {
  console.log('SW Installed');
  event.waitUntil(
    caches.open('static-eParking')
      .then(function (cache) {
        cache.addAll([
          '/',
          '/index.html',
        ]);
      })
  );
  console.log('Cached');
});
const enableNavigationPreload = async () => {
  console.log('enableNavigationPreload');
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
};
self.addEventListener('activate', function (event) {
  console.log('active');
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('push', (e) => {
  console.log( e.data.text());
});
self.addEventListener('fetch', function(event) {
  console.log('start fetch');
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        if (res) {
          console.log(res);
          return res;
        } else {
          console.log(event.request);
          return fetch(event.request);
        }
      })
  );
});
