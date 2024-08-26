// import 'dotenv/config'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBym1CeUXyPp3N3wu6SP2VBhyC6VDijvlY",
  authDomain: "contacts-ab19b.firebaseapp.com",
  projectId: "contacts-ab19b",
  storageBucket: "contacts-ab19b.appspot.com",
  messagingSenderId: "11482907301",
  appId: "1:11482907301:web:3ab4654109e67d1925034c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export  const db =getFirestore(app);