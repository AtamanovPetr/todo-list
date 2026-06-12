import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Твоя конфигурация из Firebase Console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
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
