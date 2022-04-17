const staticAssets= [
    './',
    './style.css',
    './static/img/30°_elbow.png',
    './static/img/45°_elbow.png',
    './static/img/45°_junction_tee.png',
    './static/img/60°_elbow.png',
    './static/img/90°_elbow.png',
    './static/img/90°_junction_tee.png',
    './static/img/90°_separation_tee.png',
    './static/img/Long_reducer.png',
    './static/img/menu.png',
    './static/img/Pressed_reducer.png',
    './static/img/refresh.png',
    './static/img/sAPDcal-ico_192.png',
    './static/img/sAPDcal-ico_512.png',
];

self.addEventListener('install', async event=>{
    const cache = await caches.open('static-cache');
    cache.addAll(staticAssets);
});


self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);

    if(url.origin === location.url){
        event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(newtorkFirst(req));
    }
});


async function cacheFirst(req){
    const cachedResponse = caches.match(req);
    return cachedResponse || fetch(req);
}

async function newtorkFirst(req){
    const cache = await caches.open('dynamic-cache');

    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        return await cache.match(req);
    }
}