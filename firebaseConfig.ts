import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCyqve1Z90OcjLrF7v8jBhPdiv00LI7hPc',
  authDomain: 'gymbuddy-3e277.firebaseapp.com',
  projectId: 'gymbuddy-3e277',
  storageBucket: 'gymbuddy-3e277.appspot.com',
  messagingSenderId: '862670505035',
  appId: '1:862670505035:web:45a93719bd16b8edb479ce',
  measurementId: 'G-18GPF3FQRM',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
