import firebase from 'firebase'
import 'firebase/storage'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
const app = firebase.app()
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

if (!app.name) {
  console.log('Firebase not working.')
}

export {
  app, auth, db, storage,
}
