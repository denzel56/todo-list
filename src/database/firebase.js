// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPe4wPg-EgQO8I4kcFPoxMFVUFUeNEzAQ",
  authDomain: "todo-list-52bdd.firebaseapp.com",
  databaseURL: "https://todo-list-52bdd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-list-52bdd",
  storageBucket: "todo-list-52bdd.appspot.com",
  messagingSenderId: "657532844380",
  appId: "1:657532844380:web:92205899a5453c4daea999"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
console.log(auth);
export default auth;
