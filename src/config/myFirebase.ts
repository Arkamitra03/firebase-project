// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN3te9FhdXEuCttZ-aD3b5JLfggFdFxQ4",
  authDomain: "first-project-e4b87.firebaseapp.com",
  projectId: "first-project-e4b87",
  storageBucket: "first-project-e4b87.appspot.com",
  messagingSenderId: "13818842248",
  appId: "1:13818842248:web:c822bfb5b185d39d73a33d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);