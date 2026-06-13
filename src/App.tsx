import { useState, useEffect, useMemo } from "react";
import type { Todo, FilterType } from "./types";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
import Archive from "./components/Archive";
import Dashboard from "./components/Dashboard";
import { loginWithGoogle } from "./firebase";
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      const state = JSON.parse(saved);
      setTodos(
        state.filter(
          (item: Todo) =>
            item.completedDate != null ||
            (!item.completed &&
              item.createdAt === new Date().toLocaleDateString("ru-RU")),
        ),
      );
    }
  }, []);
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);
  function handleAddTodo(text: string) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text,
      completed: false,
      completedDate: null,
      createdAt: new Date().toLocaleDateString("ru-RU"),
    };
    setTodos((prev) => [...prev, newTodo]);
  }
  function handleToggle(id: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedDate: todo.completed
                ? null
                : new Date().toLocaleDateString("ru-RU"),
            }
          : todo,
      ),
    );
  }
  function handleDelete(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }
  const filteredTodos = useMemo(() => {
    const filtered = todos.filter((todo) => {
      if (filter === "active") {
        return !todo.completed;
      } else if (filter === "completed") {
        return todo.completed;
      }
      return true;
    });
    return filtered;
  }, [todos, filter]);
  function handleClearAll() {
    setTodos(todos.filter((todo) => todo.completedDate != null));
  }

  function handleClearDate(date: string) {
    setTodos(todos.filter((todo) => todo.completedDate !== date));
  }
  async function handleLogin() {
    const uid = await loginWithGoogle();
    if (uid) {
      setUserId(uid);
    }
  }

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-logo">ToDo List</h1>
        <div className="auth-area">
          {userId ? (
            <>
              <span className="auth-user">Вы вошли</span>
              <button className="auth-btn" onClick={() => setUserId(null)}>
                Выйти
              </button>
            </>
          ) : (
            <button className="auth-btn" onClick={handleLogin}>
              Войти через Google
            </button>
          )}
        </div>
      </header>
      <AddTodoForm onAdd={handleAddTodo} />
      <FilterButtons
        onClear={handleClearAll}
        filter={filter}
        onFilterChange={setFilter}
      />
      <div className="main-content">
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
        <Dashboard todos={todos} />
      </div>
      <Archive onClearDate={handleClearDate} todos={todos} />
    </div>
  );
}

// if (!userId) {
//     return (
//       <div className="login-container">
//         <h2 className="login-title">Добро пожаловать в ToDo List!</h2>
//         <p className="login-subtitle">Войди, чтобы синхронизировать задачи</p>
//         <button onClick={handleLogin} className="login-btn">
//           Войти через Google
//         </button>
//       </div>
//     );
//   }

export default App;
