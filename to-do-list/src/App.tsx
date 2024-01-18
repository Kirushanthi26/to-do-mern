import "./App.css";
import Header from "./components/Header.tsx";
import Todos from "./components/Todos.tsx";
import goalImg from "./assets/goals.jpg";
import NewTodo from "./components/NewTodo.tsx";
import { useState } from "react";
import Todo from "./model/Todo.tsx";
import EditToDo from "./components/EditToDo.tsx";

const App = () => {
  const [notes, setNotes] = useState<Todo[]>([])
  const [editNotes, setEditNotes] = useState<Todo>({title:"", description:"", id:+""})
  const [isEditting, setIsEdtting] = useState<boolean>(false)

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

  const onEditToDoHandler = (editToDoItem: Todo) => {
    setIsEdtting(true)

    setEditNotes({
      title:editToDoItem.title,
      description:editToDoItem.description,
      id:editToDoItem.id
    })
  }

  const updateToDo = (updateToDoItem:Todo) => {
    setIsEdtting(false)
    setNotes(notes.map((n)=>(n.id === updateToDoItem.id ? updateToDoItem:n)))
  }

  return (
    <div className="flex justify-center items-center h-auto my-10">
      <main className="w-1/2 h-auto p-6 shadow-lg bg-white rounded-md">
        <Header image={{ src: goalImg, alt: "header image" }}>
          <h1 className="text-3xl font-semibold tracking-widest text-center uppercase text-amber-800">
            To Do List
          </h1>
        </Header>
        {!isEditting && <NewTodo onAddTodo={addNoteHandler}/>}
        {isEditting && <EditToDo editNotes={editNotes} updateToDo={updateToDo} setIsEdtting={setIsEdtting}/>}
        <Todos notes={notes} onRemoveToDo={onRemoveToDoHandler} onEditToDo={onEditToDoHandler}/>
      </main>
    </div>
  );
};

export default App;
