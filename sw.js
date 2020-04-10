

const CACHE_NAME = 'v1';


caches.open(CACHE_NAME).then((cache) => {
  return cache.addAll([
    './video/warp.mp4',
    './video.html',
    './index.html'
  ]);
   console.log("cache.addAll ok")
});




self.addEventListener('install', function(event)
{
//プログラム修正した新しいService Workerの制御を即座に開始
  event.waitUntil(self.skipWaiting());
  console.log('インストール');
});

//install完了するとactivateになる
self.addEventListener('activate', (event) => {
//初回から強制的にService Workerの制御を開始
  event.waitUntil(self.clients.claim());
  console.info('activate', event);
});


self.addEventListener('fetch', function(event) {
  console.log('fetch', event.request.url);

  event.respondWith(
    // リクエストに一致するデータがキャッシュにあるかどうか
    caches.match(event.request).then(function(cacheResponse) {
      // キャッシュがあればそれを返す、なければリクエストを投げる
      return cacheResponse || fetch(event.request).then(function(response) {
        return caches.open(CACHE_NAME).then(function(cache) {
          // レスポンスをクローンしてキャッシュに入れる
          cache.put(event.request, response.clone());
          // オリジナルのレスポンスはそのまま返す
          return response;
        });
      });
    })
  );
});