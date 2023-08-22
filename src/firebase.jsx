// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import { getDatabase} from "firebase/database";
import { doc, setDoc, getDoc } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize Firebase Analytics

export const firestore = getFirestore(app);

export const database = getDatabase(app);
export const analytics = getAnalytics(app); // Export Firebase Analytics

export async function updateDatabase(state) {
  try {
    const docRef = doc(firestore, "user_notes", "redux_state");
    await setDoc(docRef, state);
    console.log("Document updated successfully.");
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

export async function fetchInitialState() {
  try {
    const docRef = doc(firestore, "user_notes", "redux_state");
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
