import React from "react";
import type { Todo } from "../types";
function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="todo-item">
      <input
        className="todo-item__checkbox"
        type="checkbox"
        onChange={() => onToggle(todo.id)}
      ></input>
      <span
        className={`todo-item__text ${todo.completed ? "todo-item__text--completed" : ""}`}
      >
        {todo.text}
      </span>
      <button className="todo-item__delete" onClick={() => onDelete(todo.id)}>
        ✕
      </button>
    </div>
  );
}
export default TodoItem;
