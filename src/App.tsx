import { useState, useEffect, useMemo } from "react";
import type { Todo, FilterType } from "./types";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
import Archive from "./components/Archive";
import Dashboard from "./components/Dashboard";
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
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

  return (
    <div className="container">
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

export default App;
