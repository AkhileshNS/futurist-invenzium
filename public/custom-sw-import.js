
// Dynamic Cache VERSION 3
var CACHE_STATIC_NAME = 'fonts-v1';
var CACHE_DYNAMIC_NAME = 'dynamic-v3';

self.addEventListener('install', function(event) {
  console.log('install prompt : 1');
  event.waitUntil(

    //Open new Cache
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        console.log('Precaching App Fonts');

        //Adding all the files that need to be stored in cache
        cache.addAll([
          'https://fonts.gstatic.com/s/anton/v9/1Ptgg87LROyAm3Kz-C8.woff2',
          'https://fonts.googleapis.com/css?family=Anton',
          'https://fonts.googleapis.com/css?family=Fira+Sans:500,600'
        ]);
      })
  )
});

self.addEventListener('fetch', function(event) {

    /*if (event.request.url.indexOf('firebase')!=-1){
      console.log(`FIREBASE : ${event.request.url}`);
    } else {
      console.log(event.request.url);
    }*/

    event.respondWith(
  
      //Checking in cache if the request exists
      caches.match(event.request)
        .then(function(cachedResponse) {
          if (cachedResponse) {
  
            //Cached data exists and is returned
            return cachedResponse;
          
          } else {
  
            //Cached data doesn't exist and we are returning the network response
            return fetch(event.request)
            .then(function(networkRes) {
              
              //here res is the network response which we are storing into cache
              return caches.open(CACHE_DYNAMIC_NAME)
              .then(function(cache) {
                if(event.request.url!='http://localhost:5000/service-worker.js'){

                  console.log(`Cached ${event.request.url}`);
                  cache.put(event.request.url, networkRes.clone());
                }
                return networkRes;
              })
            })
            .catch(function(err) {
              //Error
            });
          }
        })
    );
}); 

self.addEventListener('message', function(event) {
  if (event.data==='clear'){
    console.log(`Removing ${CACHE_DYNAMIC_NAME}`);
    caches.delete(CACHE_DYNAMIC_NAME);
  }
});