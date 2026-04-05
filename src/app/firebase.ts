// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgjbQApukVjQH7HEfstI2B2_y4JuznrL4",
  authDomain: "firststep-3f1c6.firebaseapp.com",
  projectId: "firststep-3f1c6",
  storageBucket: "firststep-3f1c6.firebasestorage.app",
  messagingSenderId: "902459334265",
  appId: "1:902459334265:web:f66f1841c92edf53bcfea8",
  measurementId: "G-11B2GRF9LW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
 