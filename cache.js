"use strict";

caches.open("files").then(cache=>{
    cache.addAll(["js/funciones.js","css/estilos.css","img","css/normalize.css","index.html","nosotros.html","contacto.html"]);
})
