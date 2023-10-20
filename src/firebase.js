import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, setPersistence } from 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyDCMXw0ba4Gp4DtUvGOLanV9IjLkx97LNw",
    authDomain: "trabajarsalta-6769c.firebaseapp.com",
    projectId: "trabajarsalta-6769c",
    storageBucket: "trabajarsalta-6769c.appspot.com",
    messagingSenderId: "503233142155",
    appId: "1:503233142155:web:57aa8ad6c8d7d42d7ee38e",
    measurementId: "G-BLL057MYLW"
  };




const app = getApps.length >0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app);

export {auth,app,firestore,storage}