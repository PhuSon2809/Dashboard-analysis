import { initializeApp } from 'firebase/app'
import { getToken } from 'firebase/messaging'
import { getMessaging } from 'firebase/messaging/sw'
import { LOCAL_STORAGE } from '~/constants/localStorage'
import { setLocalStorage } from '~/utils/localStorage'

export const firebaseConfig = {
  apiKey: 'AIzaSyC-VK_oQ4_wbmzcFCW_mQpX7AZImdygWkk',
  authDomain: 'metanode-t.firebaseapp.com',
  projectId: 'metanode-t',
  storageBucket: 'metanode-t.appspot.com',
  messagingSenderId: '221202707667',
  appId: '1:221202707667:web:2f505b55d4b25228505026',
  measurementId: 'G-TWB1PYT9ZQ'
}

export const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app)

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      try {
        const currentToken = await getToken(messaging, {
          vapidKey: 'BBTe4c_UBLIJot7MzqYL0Y-FpfYJbKPWm3Lw3xhCNVJVw7YUuX1wn92sMMsiliLV1822btjY0ZNlxoe5Vh-EzgE'
        })
        if (currentToken) {
          setLocalStorage(LOCAL_STORAGE.DEVICE_TOKEN, currentToken)
          return currentToken
        } else {
          console.log('Failed to generate the app registration token.')
        }
      } catch (error) {
        console.log('Error generating the app registration token', error)
      }
    } else {
      console.log('Permission denied.')
      return false
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error)
    return false
  }
}
