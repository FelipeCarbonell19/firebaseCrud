import firebase from "firebase";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCqCWi10N-8UBDXpUMVXVV6YVti94yLul8",
  authDomain: "crudwebjueves.firebaseapp.com",
  projectId: "crudwebjueves",
  storageBucket: "crudwebjueves.appspot.com",
  messagingSenderId: "693774698231",
  appId: "1:693774698231:web:fc1836d11a0739957275f2"
};

  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export {firebase};