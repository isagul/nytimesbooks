// import {precacheAndRoute} from 'workbox-precaching';

// precacheAndRoute(self.__WB_MANIFEST);
var CACHE_NAME = 'v1';


self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request)
            .then(res => {
                const resClone = res.clone();
                caches
                    .open(CACHE_NAME)
                    .then(cache => {
                        cache.put(event.request, resClone);
                    });
                return res;
            }).catch(err => caches.match(event.request).then(res => res))
    );
});