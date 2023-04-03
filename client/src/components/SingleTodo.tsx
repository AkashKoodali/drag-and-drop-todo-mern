import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Todo } from "../models/models";
import { Draggable } from "react-beautiful-dnd";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";

const SingleTodo: React.FC<{
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = async (e: React.FormEvent, _id: number) => {
    e.preventDefault();
    const { data } = await axios.put(`/api/tasks/${_id}`, {
      title: editTodo,
    });
    setTodos(
      todos.map((todo) =>
        todo._id === _id ? { ...data, todo: editTodo } : todo
      )
    );
    setEdit(false);
    toast.success("Task updated");
  };

  const handleDelete = async (_id: number) => {
    try {
      await axios.delete(`/api/tasks/${_id}`);
      toast.success("Task deleted");
      setTodos(todos.filter((todo) => todo._id !== _id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Draggable draggableId={todo._id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo._id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.completed ? (
            <span className="todos__single--text">{todo.title}</span>
          ) : (
            <s className="todos__single--text">{todo.title}</s>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.completed) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo._id)}>
              <AiFillDelete />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
