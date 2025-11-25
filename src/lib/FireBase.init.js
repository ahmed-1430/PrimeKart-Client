// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.Next_apiKey,
    authDomain: import.meta.env.Next_authDomain,
    projectId: import.meta.env.Next_projectId,
    storageBucket: import.meta.env.Next_storageBucket,
    messagingSenderId: import.meta.env.Next_messagingSenderId,
    appId: import.meta.env.Next_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();