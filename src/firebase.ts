import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import type { Todo } from "./types";
// Твоя конфигурация из Firebase Console
import { signOut } from "firebase/auth";
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
export const auth = getAuth(app);
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

export const deleteTodoFromCloud = async (userId: string, todoId: string) => {
  const docRef = doc(db, "users", userId, "todos", todoId);
  await deleteDoc(docRef);
};

export const loadTodos = async (userId: string): Promise<Todo[]> => {
  const todosRef = collection(db, "users", userId, "todos");
  const snapshot = await getDocs(todosRef);
  const todos: Todo[] = [];
  snapshot.forEach((doc) => {
    todos.push({ id: doc.id, ...doc.data() } as Todo);
  });
  return todos;
};

export const saveTodos = async (userId: string, todos: Todo[]) => {
  console.log("saveTodos вызвана, userId:", userId, "todos:", todos);
  await Promise.all(
    todos.map((todo) => {
      const todosRef = doc(db, "users", userId, "todos", todo.id);
      const { id, ...data } = todo;
      return setDoc(todosRef, data);
    }),
  );
};

export const logout = async () => {
  await signOut(auth);
};
