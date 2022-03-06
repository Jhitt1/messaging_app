import Firebase, { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCZNdlk2CueasNYqSXfxq-xGOlpTjqBK18",
  authDomain: "messaging-app-f49ce.firebaseapp.com",
  projectId: "messaging-app-f49ce",
  storageBucket: "messaging-app-f49ce.appspot.com",
  messagingSenderId: "492168396317",
  appId: "1:492168396317:web:07967d5b07772449af50f4"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);