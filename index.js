if ('serviceWorker' in navigator) {
  console.log('Service Worker is supported');
  navigator.serviceWorker.register('./serviceworker.js').then(function(reg) {
    console.log('Service Worker is ready :^)', reg);
    reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
      console.log('subscribed:' , sub)
      console.log('endpoint:', sub.endpoint);

      var iframe = document.createElement("iframe");
    	iframe.src = './send?endpoint=' + sub.endpoint;
      iframe.width = 1
      iframe.height = 1
      document.body.appendChild(iframe);

    });
  }).catch(function(error) {
    console.log('Service Worker error :^(', error);
  });
}
