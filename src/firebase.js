import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDLwyXsZtJOMc6x9Pzbke37VLZ5iXG1pBY",
  authDomain: "paradox-labs.firebaseapp.com",
  projectId: "paradox-labs",
  storageBucket: "paradox-labs.appspot.com",
  messagingSenderId: "696112399389",
  appId: "1:696112399389:web:5e434cbcd2ccef8b5d72f4",
  measurementId: "G-3MR5DNYKHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 