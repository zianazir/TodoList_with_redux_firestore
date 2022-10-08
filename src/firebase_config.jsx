import 'firebase/app'
import 'firebase/firestore';


import {getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAOpvqDefuyCCBCBd5tjliaZwnQHZilO4c",
  authDomain: "todolist-firebase-redux.firebaseapp.com",
  projectId: "todolist-firebase-redux",
  storageBucket: "todolist-firebase-redux.appspot.com",
  messagingSenderId: "666425638695",
  appId: "1:666425638695:web:8118857f2db85934907302",
  measurementId: "G-M98WDF7Y4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
