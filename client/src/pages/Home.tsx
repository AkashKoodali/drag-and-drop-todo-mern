import React, { useEffect, useState } from "react";
import { Todo } from "../models/models";
import InputField from "../components/InputField";
import TodoList from "../components/TodoList";
import { DragDropContext, DraggableId, DropResult } from "react-beautiful-dnd";
import { toast } from "react-hot-toast";
import axios from "../utils/axios";

type Props = {};

const Home = (props: Props) => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [completedTodos, setcompletedTodos] = useState<Array<Todo>>([]);

  const getTasks = async () => {
    try {
      const { data } = await axios.get("/api/tasks/mytasks");
      console.log(data);
      setTodos(data.filter((todo: Todo) => todo.completed === true));
      // setTodos(data.sort((a , b ) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()),);
    } catch (err) {
      console.log(err);
    }
  };

  const getCompltedTasks = async () => {
    try {
      const { data } = await axios.get("/api/tasks/mytasks");
      console.log(data);
      setcompletedTodos(data.filter((todo: Todo) => todo.completed === false));
      // setTodos(data.sort((a , b ) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()),);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (_id: DraggableId) => {
    const task = await axios.get(`/api/tasks/${_id}`);
    console.log(task);

    const data: any = await axios
      .put(`/api/tasks/${task.data.task._id}`, {
        completed: !task.data.task.completed,
      })
      .then(() =>
        todos.map((todo) =>
          todo._id === task.data.task._id
            ? setTodos({ ...data })
            : setcompletedTodos({ ...data })
        )
      )
      .catch((err) => {
        console.log(err);
      });

    return;
  };

  useEffect(() => {
    getTasks();
    getCompltedTasks();
  }, []);

  const addNewTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.length <= 0) {
      toast.error("Task is empty");
      return;
    }
    try {
      const { data } = await axios.post("/api/tasks/", {
        title: todo,
      });
      toast.success("New task added");
      setTodo("");
      setTodos([{ ...data }, ...todos]);
    } catch (err) {
      console.log(err);
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);
    handleEdit(result.draggableId);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let add;
    let active = todos;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setcompletedTodos(complete);
    console.log(complete);

    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} addNewTask={addNewTask} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setcompletedTodos={setcompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default Home;
