import React, { useState } from "react";
function AddTodoForm({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState<string>("");
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }
  function sendText(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd(text);
    setText("");
  }
  return (
    <form action="#" onSubmit={sendText} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={handleInput}
        className="todo-input"
      />
      <button className="todo-btn" type="submit"></button>
    </form>
  );
}

export default AddTodoForm;
