import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyBrhpTe6kvww_o7a9SiWLqf3hjYN1bxICE",
  authDomain: "auth-development-750b7.firebaseapp.com",
  projectId: "auth-development-750b7",
  storageBucket: "auth-development-750b7.appspot.com",
  messagingSenderId: "569378386509",
  appId: "1:569378386509:web:f621dc46a6bc62b33a6204"
});
export const auth = app.auth();
export const db = app.firestore();
export default app;
