const CACHE_NAME = 'v1';
import { Queue } from 'workbox-background-sync';

const queue = new Queue('nytimesQueue');

const assets = [
    '../assets/images/books-avatar.png',
    '../assets/images/favicon.png',
    '../dist/index.html',
];
/*
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(assets);
        })
    )
})

self.addEventListener('activate', event => {
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


self.addEventListener('fetch', event => {
    let pattern = new RegExp("^(http|https):");
    let result = pattern.test(event.request.url);
    if (result === true) {
        event.respondWith(
            fetch(event.request)
                .then(res => {
                    const resClone = res.clone();
                    const promiseChain = fetch(resClone).catch((err) => {
                        return queue.pushRequest({ request: event.request });
                    });
                    event.waitUntil(promiseChain);
                    caches
                        .open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, resClone);
                        });
                    return res;
                }).catch(err => caches.match(event.request).then(res => res))
        );
    }
});*/