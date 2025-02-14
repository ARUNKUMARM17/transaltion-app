// components/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// firebase.config.js
// const firebaseConfig = {
//     apiKey: "AIzaSyAU46-Nakp5AwTp6lsdG_Yj2bioBR4nNM4",
//     authDomain: "my-translation-project-17.firebaseapp.com",
//     projectId: "my-translation-project-17",
//     storageBucket: "my-translation-project-17.firebasestorage.app",
//     messagingSenderId: "407829474365",
//     appId: "1:407829474365:web:824c787ed369e746810e54"
//   };  
  const firebaseConfig = {
    apiKey: "AIzaSyA34p12c5liy8sKmB6Ym5ugRaEzOAPTB8k",
    authDomain: "translation-app-2674c.firebaseapp.com",
    projectId: "translation-app-2674c",
    storageBucket: "translation-app-2674c.firebasestorage.app",
    messagingSenderId: "831020188865",
    appId: "1:831020188865:web:9a4007c37939fd7ac10040",
    measurementId: "G-1F5HP2PDYK"
  };




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

