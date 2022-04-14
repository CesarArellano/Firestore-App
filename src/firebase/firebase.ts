// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  QueryDocumentSnapshot,
  DocumentData,
  Query,
} from 'firebase/firestore';
import { MedicalModel } from '../interfaces/medical.model';
import Swal from "sweetalert2";


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
export const collectionRef = collection(db, 'medicalHistory');


export const registerNewMedicalRecord = async ( newMedicalRecord:MedicalModel ) => {
  try {
    addDoc( collectionRef, newMedicalRecord);
    Swal.fire('¡Buen trabajo!', 'El historial médico se registro con éxito', 'success');
  } catch (error) {
    Swal.fire('¡Upps!', 'Algo salió mal', 'error');
  }
}

export const getMedicalRecords = async ( q:Query<DocumentData> ) => {
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data()
      }) as MedicalModel
    );
  } catch (error) {
    Swal.fire('¡Upps!', 'Algo salió mal', 'error');
    return [];
  }
}