// components/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// firebase.config.js
const firebaseConfig = {
    apiKey: "AIzaSyAU46-Nakp5AwTp6lsdG_Yj2bioBR4nNM4",
    authDomain: "my-translation-project-17.firebaseapp.com",
    projectId: "my-translation-project-17",
    storageBucket: "my-translation-project-17.firebasestorage.app",
    messagingSenderId: "407829474365",
    appId: "1:407829474365:web:824c787ed369e746810e54"
  };  




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

