// Service Worker สำหรับ PWA Classification Game
// รุ่น 1.0.0

const CACHE_NAME = "classification-game-v1.1.13";
const RUNTIME_CACHE = "classification-runtime-v24";

// รายการไฟล์ที่ต้อง cache ทั้งหมด
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/script.js",
  "./font/Itim-Regular.ttf",
  // รูปภาพผักและผลไม้
  "./images/กระท้อน.png",
  "./images/กล้วยหอม.png",
  "./images/กะหล่ำดอก.png",
  "./images/กะหล่ำปลี.png",
  "./images/แคร์รอต.png",
  "./images/แตงกวา.png",
  "./images/แตงโม.png",
  "./images/พริก.png",
  "./images/มะเขือเทศ.png",
  "./images/มะเขือเปราะ.png",
  "./images/มะเขือยาว.png",
  "./images/มะนาว.png",
  "./images/มะละกอ.png",
  "./images/มังคุด.png",
  "./images/ส้ม.png",
  "./images/สาลี่.png",
  "./images/หอมใหญ่.png",
  "./images/หัวผักกาดขาว.png",
  "./images/แอปเปิล.png",
  "./images/แอปเปิลเขียว.png",
  "./images/app-icon.svg",
  "./images/ios-share-icon.png",
  "./images/ios-share-icon-dark.svg"
];

// ====== Installation ======
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching assets...");
      return cache.addAll(ASSETS_TO_CACHE).catch((error) => {
        console.warn("[Service Worker] Some assets failed to cache:", error);
        // ไม่ throw error เพราะเกม ยังสามารถทำงานได้บ้างด้วย network
      });
    })
  );

  self.skipWaiting(); // ให้ new SW activate ทันที
});

// ====== Activation ======
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log("[Service Worker] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  self.clients.claim(); // ให้ new SW เข้าควบคุมทั้งหมดทันที
});

// ====== Fetch Strategy ======
// ใช้ Cache-First สำหรับสิ่งที่ไม่เปลี่ยนแปลง (images, fonts)
// ใช้ Network-First สำหรับ HTML, CSS, JS เพื่อให้ update ได้
// ใช้ Stale-While-Revalidate สำหรับ API

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // ข้าม request ที่ไม่ใช่ GET
  if (event.request.method !== "GET") {
    return;
  }

  // ข้าม request จาก extension
  if (url.protocol === "chrome-extension:") {
    return;
  }

  // สำหรับรูปภาพและฟอนต์: Cache First
  if (isAsset(url)) {
    event.respondWith(cacheFirstStrategy(event.request));
    return;
  }

  // สำหรับ HTML, CSS, JS: Network First
  if (isDocument(url)) {
    event.respondWith(networkFirstStrategy(event.request));
    return;
  }

  // Default: Network First
  event.respondWith(networkFirstStrategy(event.request));
});

// ====== Cache Strategies ======

/**
 * Cache First Strategy:
 * 1. ลองหาจาก cache ก่อน
 * 2. ถ้าไม่เจอ ให้ fetch จาก network
 * 3. บันทึกลงใน cache
 */
function cacheFirstStrategy(request) {
  return caches.match(request).then((response) => {
    if (response) {
      console.log("[Service Worker] Cache hit:", request.url);
      return response;
    }

    return fetch(request).then((response) => {
      if (!response || response.status !== 200 || response.type === "error") {
        return response;
      }

      // Clone response เพราะ response สามารถใช้ได้ครั้งเดียว
      const responseToCache = response.clone();

      caches.open(RUNTIME_CACHE).then((cache) => {
        cache.put(request, responseToCache);
      });

      return response;
    }).catch(() => {
      console.log("[Service Worker] Network failed, returning offline response");
      return new Response("Offline - Resource not available", {
        status: 503,
        statusText: "Service Unavailable"
      });
    });
  });
}

/**
 * Network First Strategy:
 * 1. ลองดึงจาก network ก่อน
 * 2. ถ้า network ล่ม ให้หาจาก cache
 * 3. บันทึกลงใน cache
 */
function networkFirstStrategy(request) {
  return fetch(request).then((response) => {
    if (!response || response.status !== 200 || response.type === "error") {
      return response;
    }

    // บันทึกลงใน cache
    const responseToCache = response.clone();
    caches.open(RUNTIME_CACHE).then((cache) => {
      cache.put(request, responseToCache);
    });

    return response;
  }).catch(() => {
    console.log("[Service Worker] Network failed, checking cache...");

    return caches.match(request).then((response) => {
      if (response) {
        console.log("[Service Worker] Found in cache:", request.url);
        return response;
      }

      // ถ้า cache ไม่เจอ ให้ return offline page
      return new Response("Offline - Document not available", {
        status: 503,
        statusText: "Service Unavailable",
        headers: new Headers({
          "Content-Type": "text/plain; charset=utf-8"
        })
      });
    });
  });
}

// ====== Helper Functions ======

function isAsset(url) {
  const pathname = url.pathname;
  return /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/.test(pathname);
}

function isDocument(url) {
  const pathname = url.pathname;
  return /\.(html|css|js)$/.test(pathname) || pathname === "./";
}

// ====== Message Handling ======
// เพื่อให้ client สามารถ communicate กับ service worker

self.addEventListener("message", (event) => {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }

  if (event.data.action === "getCacheSize") {
    caches.keys().then((cacheNames) => {
      let totalSize = 0;
      Promise.all(
        cacheNames.map((cacheName) => {
          return caches.open(cacheName).then((cache) => {
            return cache.keys().then((requests) => {
              return Promise.all(
                requests.map((request) => {
                  return cache.match(request).then((response) => {
                    if (response) {
                      return response.blob().then((blob) => {
                        totalSize += blob.size;
                      });
                    }
                  });
                })
              );
            });
          });
        })
      ).then(() => {
        event.ports[0].postMessage({
          action: "cacheSize",
          bytes: totalSize,
          megabytes: (totalSize / 1024 / 1024).toFixed(2)
        });
      });
    });
  }
});

console.log("[Service Worker] Service Worker loaded and ready!");
