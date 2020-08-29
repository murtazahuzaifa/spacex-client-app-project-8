

const cacheName = 'v1';

/*
const cacheAssets = [
  'serviceRegister.js',

  '/index.html',
  '/static/js/bundle.js',
  '/static/js/0.chunk.js',
  '/static/js/main.chunk.js',
  '/App.js',
  '/',


];

*/


const cacheFiles = [
  './static/css/main.3d0797e8.chunk.css',
  './static/js/2.c37db9c6.chunk.js',
  './static/js/main.7f068d44.chunk.js',
  './static/media/bg.941bbe01.jpg',
  './index.html',
  'favicon.ico',
  'logo192.png',
  'logo512.png',
  'manifest.json',
  'precache-manifest.48baa4ceca12dd1a5bd024edd84bf245.js',
  'robots.txt',
  '/'
];


self.addEventListener("install", (e) => {
  console.log("[Service Worker] installed");
  // e.waitUntil(
  //   caches.open(cacheName).then(cache => {
  //     console.log('[Service Worker] caching files');
  //     return cache.addAll(cacheFiles);
  //   })
  // )
})

self.addEventListener("activate", (e) => {
  console.log("[Service Worker] activate");
  e.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(cacheNames.map(theCache => {
        if (theCache !== cacheName) {
          console.log('[Service Worker] deleting the cache files from ', theCache);
          return caches.delete(theCache);
        }
      }
      ))
    )
  )
})

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
      fetch(fetchEvent.request).then(res => {
        // console.log('response.type : ', res.type)
        // console.log('response.type : ', fetchEvent.request.url)
          const cacheRes = res.clone();
          if(res.type !== 'cors'){
            caches.open(cacheName)
            .then(cache => cache.put(fetchEvent.request, cacheRes));
          }
          return res;
      }).catch(() => caches.match(fetchEvent.request).then(res => res))
  );
});

// self.addEventListener('fetch', event => {
//   console.log('Fetch event for ', event.request.url);
//   event.respondWith(
//     caches.match(event.request)
//     .then(response => {
//       if (response) {
//         console.log('Found ', event.request.url, ' in cache');
//         return response;
//       }
//       console.log('Network request for ', event.request.url);
//       return fetch(event.request)

//       .then(response => {
        
//         return caches.open(cacheName).then(cache => {
//           if (response.type === "basic"){
//           cache.put(event.request.url, response.clone());
//         }
//           return response;
//         });
//       }).catch(()=>{
//        return caches.match('./').then(response => {
//           if (response) {
//             console.log('Found ', event.request.url, ' in cache');
//             console.log(response);
//             return response;
//           }
//         });

//         });

//     }).catch(error => {
    
//         console.log("error in loading pages")

//     })
//   );
// });