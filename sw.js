console.log("Service worker: registered");
let name_cache = 'restaurant-v1';

self.addEventListener('Install', function (event) {
	event.waitUntil(
		caches.open(name_cache).then(function (cache) {
			return cache.addAll([
				'./',
				'./index.html',
				'./restaurant.html',
				'./css/styles.css',
				'./css/mobileCss.css',
				'./css/laptop.css',
				'./js/dbhelper.js',
				'.data/restaurant.json',
				'./js/main.js',
				'./js/restaurant_info.js',
				'/js/swRegister.js',
				'./img/1.jpg',
				'./img/2.jpg',
				'./img/3.jpg',
				'./img/4.jpg',
				'./img/5.jpg',
				'./img/6.jpg',
				'./img/7.jpg',
				'./img/8.jpg',
				'./img/10.jpg'

			], {
				mode: 'no-cors'
			});
		})
	);
});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys()
			.then(function (cacheNames) {
				return Promise.all(
					cacheNames.filter(function (cacheName) {
						return cacheName.startsWith('restaurant-') &&
							cacheName != name_cache;
					}).map(function (cacheName) {
						return caches.delete(cacheName);
					})
				);
			})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request)
		.then(function (response) {
			if (response) {
				return response;
			}
			return fetch(event.request);


		})
	);

});
