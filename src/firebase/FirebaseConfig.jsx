// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Firebase Storage 모듈 추가

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbTU7tXxIbBcq9xv2zAFLS01df4-_LvB0",
  authDomain: "shoppingportfolio-524da.firebaseapp.com",
  projectId: "shoppingportfolio-524da",
  storageBucket: "shoppingportfolio-524da.appspot.com",
  messagingSenderId: "125422804812",
  appId: "1:125422804812:web:0d3d04d400087cc6f939e9",
  measurementId: "G-MSK06ZXM7Z",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스
const fireDB = getFirestore(app);

// 로그인/회원가입
const auth = getAuth(app);

// Authentication 인스턴스
export const fireAuth = getAuth(app);

// Firebase Storage 인스턴스
export const fireStorage = getStorage(app);

export { fireDB, auth };
