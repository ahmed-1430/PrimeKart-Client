// src/lib/FireBase.init.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
