// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC05rD2bCaqNuoarbIU622FeW-W_SeocsU",
  authDomain: "blood-donator-unity.firebaseapp.com",
  projectId: "blood-donator-unity",
  storageBucket: "blood-donator-unity.appspot.com",
  messagingSenderId: "784958259598",
  appId: "1:784958259598:web:d825b82c4bb2026674a4df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create auth and export the auth
const auth = getAuth(app);
export default auth;