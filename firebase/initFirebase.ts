import firebase from 'firebase'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
}

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
}
