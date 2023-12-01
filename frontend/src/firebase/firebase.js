// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyA9rPaw6g_a2uPAg-nX_sEmzgPToegeFkc",
  authDomain: "project-b8c44.firebaseapp.com",
  projectId: "project-b8c44",
  storageBucket: "project-b8c44.appspot.com",
  messagingSenderId: "316140381230",
  appId: "1:316140381230:web:fab6e0d5ee9b69f444ebbf",
  measurementId: "G-WS59DB5C4S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

