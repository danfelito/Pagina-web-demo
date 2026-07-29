'use strict';
const http=require('http');
const fs=require('fs');
const path=require('path');
const root=__dirname;
const port=Number(process.env.PORT||10000);
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.md':'text/markdown; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
  if(req.url==='/health'){res.writeHead(200,{'content-type':'application/json'});return res.end(JSON.stringify({status:'ok',service:'valoraia'}));}
  const pathname=decodeURIComponent((req.url||'/').split('?')[0]);
  let file=pathname==='/'?'index.html':pathname.replace(/^\/+/, '');
  file=path.normalize(file).replace(/^(\.\.(\/|\\|$))+/, '');
  let full=path.join(root,file);
  if(!full.startsWith(root)) {res.writeHead(403);return res.end('Forbidden');}
  fs.stat(full,(err,stat)=>{
    if(err||!stat.isFile()) full=path.join(root,'index.html');
    fs.readFile(full,(readErr,data)=>{
      if(readErr){res.writeHead(500);return res.end('Server error');}
      const ext=path.extname(full).toLowerCase();
      res.writeHead(200,{'content-type':types[ext]||'application/octet-stream','x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin','permissions-policy':'camera=(), microphone=(), geolocation=(self)','content-security-policy':"default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.supabase.co wss://*.supabase.co; img-src 'self' data: blob: https://*.supabase.co; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"});
      res.end(data);
    });
  });
}).listen(port,'0.0.0.0',()=>console.log(`ValoraIA listening on ${port}`));
