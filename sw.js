/* s30s: офлайн-режим. После первого визита сайт открывается без интернета.
   Стратегии:
   - страница, скрипты, стили, данные, решения: сначала сеть (всегда свежее), при ошибке или медленной сети — копия из кэша;
   - vendor/ и материалы (фото, PDF, миниатюры): сначала кэш (быстро и офлайн), недостающее докачивается и сохраняется;
   - архивы /materials/_zip/ не кэшируются (тяжёлые, скачиваются напрямую).
   Имя кэша SW_CACHE должно совпадать с app.js. Если заменить фото материалов под тем же именем, поднимите версию (v1 -> v2). */
var SW_CACHE = "s30s-v1";
var NET_TIMEOUT = 3500;
var INDEX = new URL("index.html", self.registration.scope).href;

self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (ks) { return Promise.all(ks.filter(function (k) { return /^s30s-/.test(k) && k !== SW_CACHE; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.clients.claim(); })
  );
});

function isCacheFirst(u) {
  var p = u.pathname;
  if (/\/materials\/_zip\//.test(p)) return false;
  if (/\/materials\/[^/]+\/index\.js$/.test(p)) return false;      // описание материалов — всегда свежее
  return /\/vendor\//.test(p) || /\/materials\//.test(p);
}

function save(c, key, res) { if (res && res.ok && res.type === "basic" && res.status === 200) c.put(key, res.clone()); return res; }

function networkFirst(req, key) {
  return caches.open(SW_CACHE).then(function (c) {
    return c.match(key).then(function (cached) {
      var net = fetch(req).then(function (res) { return save(c, key, res); });
      if (!cached) return net.catch(function () { return new Response("Нет сети и нет сохранённой копии.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } }); });
      return Promise.race([
        net.catch(function () { return cached; }),
        new Promise(function (ok) { setTimeout(function () { ok(cached); }, NET_TIMEOUT); })
      ]);
    });
  });
}

function cacheFirst(req) {
  return caches.open(SW_CACHE).then(function (c) {
    return c.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) { return save(c, req, res); });
    });
  });
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var u = new URL(req.url);
  if (u.origin !== self.location.origin) return;
  if (req.headers.has("x-s30s-refresh")) return;                      // кнопка «Обновить сохранённые данные»: только сеть
  if (/\/materials\/_zip\//.test(u.pathname)) return;               // скачивание архивов — напрямую, в том числе по <a download>
  if (u.pathname === new URL("sw.js", self.registration.scope).pathname) return;

  if (req.mode === "navigate") { e.respondWith(networkFirst(req, INDEX)); return; }

  if (req.headers.has("range")) {                                   // PDF и т.п. запрашивают куски: сеть, а офлайн — целиком из кэша
    e.respondWith(fetch(req).catch(function () { return caches.match(req.url).then(function (r) { return r || Response.error(); }); }));
    return;
  }
  e.respondWith(isCacheFirst(u) ? cacheFirst(req) : networkFirst(req, req.url));
});
