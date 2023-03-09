import { initializeApp } from 'firebase/app'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

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

// TODO: à changer pour passer en prod
connectFirestoreEmulator(db, 'localhost', 8080)

export default db
