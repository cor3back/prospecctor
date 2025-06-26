// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPbOGS7Gk-XCd149KvXhfnbAoOb4hvHts",
  authDomain: "prospecctor.firebaseapp.com",
  projectId: "prospecctor",
  storageBucket: "prospecctor.firebasestorage.app",
  messagingSenderId: "117715888935",
  appId: "1:117715888935:web:cc6b21014bd4c88c399702",
  measurementId: "G-HPZT95JH65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export app and analytics so you can use them in other parts of your app
export { app, analytics };