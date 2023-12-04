// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBzys2JthHwm_t79WApxvbLgZJkalGahBU",
  authDomain: "donationapp-81249.firebaseapp.com",
  projectId: "donationapp-81249",
  storageBucket: "donationapp-81249.appspot.com",
  messagingSenderId: "130224113251",
  appId: "1:130224113251:web:cfebc84ea782fc439b5a56",
  measurementId: "G-3741ZEQWZN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

