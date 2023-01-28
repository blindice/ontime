import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";

//on-time
// const firebaseConfig = {
//   apiKey: 'AIzaSyCtP4Hxictb6_yg9bwHnqu5uywtVRo7L-w',
//   authDomain: 'bthesis-afda4.firebaseapp.com',
//   projectId: 'bthesis-afda4',
//   storageBucket: 'bthesis-afda4.appspot.com',
//   messagingSenderId: '474733194984',
//   appId: '1:474733194984:web:cb72ff23d0deda384e235d',
//   measurementId: 'G-82MMEN8PDY',
// }

const firebaseConfig = {
  apiKey: "AIzaSyDxb-2QYpGHG2v9n09nFZ8elKq8a8zvWSc",
  authDomain: "calm-magpie-364503.firebaseapp.com",
  projectId: "calm-magpie-364503",
  storageBucket: "calm-magpie-364503.appspot.com",
  messagingSenderId: "782455330032",
  appId: "1:782455330032:web:d49aeec6b3dd98ce8a5e35",
  measurementId: "G-Z7DP15TQ8W",
};

// const storageBucket = 'gs://bthesis-afda4.appspot.com' //ontime
const storageBucket = "gs://calm-magpie-364503.appspot.com";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app, storageBucket);

export { db, auth, storage };
