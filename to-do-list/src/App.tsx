import "./App.css";
import Header from "./components/Header.tsx";
import Todos from "./components/Todos.tsx";
import goalImg from "./assets/goals.jpg";
import NewTodo from "./components/NewTodo.tsx";
import { useState } from "react";
import Todo from "./model/Todo.tsx";

const App = () => {
  const [notes, setNotes] = useState<Todo[]>([])

  const addNoteHandler = (title:string, description:string) => {
    setNotes( prevNote => {
      const newNote:Todo = {
        title: title,
        description: description,
        id: Math.random()
      }
      return [newNote, ...prevNote]
    })
  }

  const onRemoveToDoHandler = (toDoId: number) => {
    setNotes(prevNote => {
      return prevNote.filter(todo => todo.id !== toDoId)
    })
  }

  return (
    <div className="flex justify-center items-center h-auto my-10">
      <main className="w-1/2 h-auto p-6 shadow-lg bg-white rounded-md">
        <Header image={{ src: goalImg, alt: "header image" }}>
          <h1 className="text-3xl font-semibold tracking-widest text-center uppercase text-amber-800">
            To Do List
          </h1>
        </Header>
        <NewTodo onAddTodo={addNoteHandler}/>
        <Todos notes={notes} onRemoveToDo={onRemoveToDoHandler}/>
      </main>
    </div>
  );
};

export default App;
