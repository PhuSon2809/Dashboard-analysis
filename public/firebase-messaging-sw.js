/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyC-VK_oQ4_wbmzcFCW_mQpX7AZImdygWkk',
  authDomain: 'metanode-t.firebaseapp.com',
  projectId: 'metanode-t',
  storageBucket: 'metanode-t.appspot.com',
  messagingSenderId: '221202707667',
  appId: '1:221202707667:web:2f505b55d4b25228505026',
  measurementId: 'G-TWB1PYT9ZQ'
})

const messaging = firebase.messaging()
const channel = new BroadcastChannel('notifications')
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
  channel.postMessage(payload)
})
