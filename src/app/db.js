import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCtP4Hxictb6_yg9bwHnqu5uywtVRo7L-w',
  authDomain: 'bthesis-afda4.firebaseapp.com',
  projectId: 'bthesis-afda4',
  storageBucket: 'bthesis-afda4.appspot.com',
  messagingSenderId: '474733194984',
  appId: '1:474733194984:web:cb72ff23d0deda384e235d',
  measurementId: 'G-82MMEN8PDY',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app, 'gs://bthesis-afda4.appspot.com')

export { db, auth, storage }
