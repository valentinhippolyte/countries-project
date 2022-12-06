import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyA0Kqe-oqXB1hLqjNA6ZkU2McJfXhUSknQ",
  authDomain: "countries-app-1dbdc.firebaseapp.com",
  projectId: "countries-app-1dbdc",
  storageBucket: "countries-app-1dbdc.appspot.com",
  messagingSenderId: "498045086990",
  appId: "1:498045086990:web:8f67357f22511db96c7b5f",
});
export const database = getDatabase(firebaseApp);
export const firestore = getFirestore(firebaseApp);
