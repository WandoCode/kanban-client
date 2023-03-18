import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDglVuatapP76ZPng141fsL3eMehv4uE50',
  authDomain: 'kanban-1492d.firebaseapp.com',
  projectId: 'kanban-1492d',
  storageBucket: 'kanban-1492d.appspot.com',
  messagingSenderId: '56424911960',
  appId: '1:56424911960:web:b375aede7d42d0f1d4262d',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth()

if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8080)
}

export { db, auth }
