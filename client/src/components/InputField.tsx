import React, { useRef } from "react";
import "./styles.css";

interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addNewTask: (e: React.FormEvent) => void;
}

const InputField: React.FC<props> = ({ todo, setTodo, addNewTask }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        addNewTask(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={todo}
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
        className="input__box"
      />
      <button type="submit" className="input_submit">
        ADD
      </button>
    </form>
  );
};

export default InputField;
