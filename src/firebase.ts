import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Твоя конфигурация из Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCfkbgw_G013t4dlkqWWJn7ZmgZbW-vnmw",
  authDomain: "todo-list-sync-c6180.firebaseapp.com",
  projectId: "todo-list-sync-c6180",
  storageBucket: "todo-list-sync-c6180.firebasestorage.app",
  messagingSenderId: "981046082260",
  appId: "1:981046082260:web:bfbaa44e0100175a16d941",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт базы данных Firestore
export const db = getFirestore(app);

// Настройка Google-авторизации
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Функция входа через Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Вход выполнен, ID пользователя:", result.user.uid);
    return result.user.uid;
  } catch (error) {
    console.error("Ошибка входа:", error);
  }
};
