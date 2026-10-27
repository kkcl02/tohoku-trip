// 離線快取：網站本體先用網路、失敗用快取；地圖圖磚和程式庫用快取優先
const V='tohoku-v1';
const SHELL=['./','index.html','config.js','manifest.webmanifest','icons/icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));return}
 if(/cyberjapandata\.gsi\.go\.jp|cdnjs\.cloudflare\.com|www\.gstatic\.com\/firebasejs|fonts\.(googleapis|gstatic)\.com/.test(u.host+u.pathname)){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(V+'-ext').then(c=>c.put(r,cp))}return res})));}
});
