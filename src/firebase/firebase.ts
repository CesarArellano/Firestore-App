// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes 
} from 'firebase/storage';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  where,
  setDoc,
  deleteDoc
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "sql-demos-19547.firebaseapp.com",
  projectId: "sql-demos-19547",
  storageBucket: "sql-demos-19547.appspot.com",
  messagingSenderId: "559793092736",
  appId: "1:559793092736:web:59ea4e41c10031da3e4e65",
  measurementId: "G-7CMCSBTXB1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export const registerNewMedicalRecord = async ( newMedicalRecord:any ) => {
  try {
    const collectionRef = collection(db, 'medicalHistory');
    const docRef = doc(collectionRef);
    await setDoc(docRef, newMedicalRecord);
  } catch (error) {
    
  }
}