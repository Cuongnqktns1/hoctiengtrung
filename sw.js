const CACHE='han-tu-hoa-v12';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const AUDIO=["p0.json", "p1.json", "p2.json", "p3.json", "p4.json", "p5.json", "p6.json", "p7.json", "p8.json", "p9.json", "p10.json", "p11.json", "p12.json", "p13.json", "p14.json", "p15.json", "p16.json", "p17.json", "p18.json", "p19.json", "p20.json", "p21.json", "p22.json", "p23.json", "p24.json", "p25.json", "p26.json", "p27.json", "p28.json", "p29.json", "p30.json", "p31.json", "p32.json", "p33.json", "p34.json", "p35.json", "p36.json", "p37.json", "p38.json", "p39.json", "p40.json", "p41.json", "p42.json", "p43.json", "p44.json"].map(n=>'./audio/'+n);
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('message',e=>{if(e.data==='cache-audio')e.waitUntil(caches.open(CACHE).then(async c=>{for(const u of AUDIO){if(!(await c.match(u))){try{await c.add(u)}catch(x){}}}}))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{
    if(res.ok&&(e.request.url.startsWith(self.location.origin)||e.request.url.includes('fonts.g'))){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}
    return res;}).catch(()=>hit)));
});
