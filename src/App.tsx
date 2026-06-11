import { useState, useEffect } from "react";
import type { Todo, FilterType } from "./types";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      const state = JSON.parse(saved);
      setTodos(state);
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
    };
    setTodos((prev) => [...prev, newTodo]);
  }
  function handleToggle(id: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }
  function handleDelete(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    } else if (filter === "completed") {
      return todo.completed;
    }
    return true;
  });
  function handleClearAll() {
    setTodos([]);
  }

  return (
    <div className="container">
      <AddTodoForm onAdd={handleAddTodo} />
      <FilterButtons
        onClear={handleClearAll}
        filter={filter}
        onFilterChange={setFilter}
      />
      <TodoList
        todos={filteredTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
