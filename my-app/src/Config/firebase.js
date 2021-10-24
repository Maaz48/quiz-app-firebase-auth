import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, getDocs, query, where, onSnapshot } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCppvIKr_rik2D6DoqY1YV9uq5Q4rTkZNQ",
  authDomain: "quizapp-1999.firebaseapp.com",
  projectId: "quizapp-1999",
  storageBucket: "quizapp-1999.appspot.com",
  messagingSenderId: "649050158419",
  appId: "1:649050158419:web:8bdd500e8598af03e9dda6"
});

const auth = getAuth();
const db = getFirestore();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,

  db,
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
};