import {getDatabase} from "firebase/database";
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPhyZ4bNnMJQMRZpbJQA0TtokiAh0FJpA",
  authDomain: "courses-app-d8209.firebaseapp.com",
  databaseURL: "https://courses-app-d8209-default-rtdb.firebaseio.com",
  projectId: "courses-app-d8209",
  storageBucket: "courses-app-d8209.appspot.com",
  messagingSenderId: "215505663876",
  appId: "1:215505663876:web:fc1a20ca60073b01c80fd1"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;