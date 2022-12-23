"use strict";

caches.open("files").then(cache=>{
    cache.addAll(["js/funciones.js","img","css/estilos.css","css/normalize.css","index.html","nosotros.html","contacto.html"]);
})