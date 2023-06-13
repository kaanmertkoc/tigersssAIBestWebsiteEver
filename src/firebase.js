import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBfErH7htwg_zfdhi-vW3k3gwaH2ilMzqg',
  authDomain: 'tigers-ai.firebaseapp.com',
  projectId: 'tigers-ai',
  storageBucket: 'tigers-ai.appspot.com',
  messagingSenderId: '34542523555',
  appId: '1:34542523555:web:e2c87ee6f08298a756db16',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
