
console.log('Started', self);

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

self.addEventListener('push', function(event) {
  console.log('Push message received', event);

  event.waitUntil(
    self.registration.showNotification('Push Received', {
      body: 'メッセージを受信しました',
      icon: './corp_logo.png',
      tag: 'push-notification-tag'
    })
  );
});

self.addEventListener("notificationclick", function(event) {
  console.log('notification clicked:' + event)
  event.notification.close();
}, false);
