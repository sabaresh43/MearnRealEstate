// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-408bf.firebaseapp.com",
  projectId: "mern-estate-408bf",
  storageBucket: "mern-estate-408bf.appspot.com",
  messagingSenderId: "496221744865",
  appId: "1:496221744865:web:eece5f2e9a2175669751a0",
  measurementId: "G-CNKY9Y17CF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);