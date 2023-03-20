import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXqIUzoSPilQxf2Mp96pIgA042pL8mgFo",
  authDomain: "it-hacks.firebaseapp.com",
  projectId: "it-hacks",
  storageBucket: "it-hacks.appspot.com",
  messagingSenderId: "192193417250",
  appId: "1:192193417250:web:75d881daeb31788fe17a7b",
  measurementId: "G-F0H1Z0XNQR"
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
