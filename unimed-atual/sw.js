// Adiciona um ouvinte de evento para o evento de instalação do Service Worker
self.addEventListener('install', event => {
  // Garante que a instalação do Service Worker não conclua até que a promessa fornecida seja resolvida
  event.waitUntil(
    // Abre (ou cria) um cache chamado 'v1'
    caches.open('v1').then(cache => {
      // Adiciona uma lista de URLs ao cache
      return cache.addAll([
        '/',  // A raiz do aplicativo
        '/index.html',  // A página inicial do aplicativo
        '/css/styles.css',  // Arquivo CSS com estilos
        '/js/script.js',  // Arquivo JavaScript para funcionalidades
        '/images/icon-192x192.png',  // Ícone de 192x192 pixels
        '/images/icon-512x512.png'   // Ícone de 512x512 pixels
      ]);
    })
  );
});

// Adiciona um ouvinte de evento para o evento de busca (fetch) do Service Worker
self.addEventListener('fetch', event => {
  // Responde à requisição interceptada
  event.respondWith(
    // Tenta encontrar uma resposta correspondente no cache para a requisição
    caches.match(event.request).then(response => {
      // Se uma resposta correspondente for encontrada no cache, retorna-a
      // Caso contrário, faz a requisição à rede
      return response || fetch(event.request);
    })
  );
});
