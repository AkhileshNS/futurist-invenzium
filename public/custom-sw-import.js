
// Dynamic Cache VERSION 3
var CACHE_STATIC_NAME = 'fonts-v1';
var CACHE_DYNAMIC_NAME = 'dynamic-v3';

var base_url = "http://localhost:5000";
importScripts('https://unpkg.com/dexie@2.0.4/dist/dexie.js');

var db = new Dexie('BackgroundSync');

db.version(1).stores({
  requests: "++id, name, message"
});

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
                if(event.request.url!=`${base_url}/service-worker.js` &&
                event.request.url!=`${base_url}/manifest.json`){

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
  
  var data = event.data.split('|');
  
  if (data[0]==='clear'){
    console.log(`Removing ${CACHE_DYNAMIC_NAME}`);
    caches.delete(CACHE_DYNAMIC_NAME);
  }

  if (data[0]==='set') {
    var req = JSON.parse(data[1]);
    var request = {
      name: req.title,
      message: req.subtext
    }
    db.table('requests')
    .add(request).then(() => {
      console.log('Added ' + request);
    });
  }

  if (data[0]==='get') {
    db.table('requests')
    .toArray()
    .then((requests) => {
      event.ports[0].postMessage(JSON.stringify(requests, null, 2));
    })
  }

});

self.addEventListener('sync', function(e) {
  if (e.tag==='sync-new-chat') {
    e.waitUntil(
      db.table('requests')
      .toArray()
      .then((requests) => {
        for (var request of requests) {
          fetch('https://teachers-notebook.firebaseio.com/public/chatroom.json', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({...request} ,null, 2)
          })
          .then((res) => {
            if (res.ok) {
              db.table('requests')
              .delete(request.id)
              .then(() => {
                console.log('Successfully Removed ' + request);
              });
            }
          })
          .catch(err => console.log(err));
        }
      })
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  var notification = event.notification;
  var action = event.action;

  if(action==='confirm'){
    
  }
});

self.addEventListener('notificationclose', function(event) {

});