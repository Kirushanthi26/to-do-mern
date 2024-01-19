import "./App.css";
import Header from "./components/Header.tsx";
import Todos from "./components/Todos.tsx";
import goalImg from "./assets/goals.jpg";
import NewTodo from "./components/NewTodo.tsx";
import { useEffect, useState } from "react";
import Todo from "./model/Todo.tsx";
import EditToDo from "./components/EditToDo.tsx";

const App = () => {
  const [notes, setNotes] = useState<Todo[]>([])
  const [editNotes, setEditNotes] = useState<Todo>({title:"", description:"", id:""})
  const [isEditting, setIsEdtting] = useState<boolean>(false)

  useEffect(()=>{
    const fetchTodoList = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData: { todos: Todo[] } = await response.json();
        setNotes(responseData.todos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTodoList();
  },[])

  const addNoteHandler = async(title:string, description:string) => {
    try {
      const response = await fetch('http://localhost:5000/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      const responseData = await response.json();

      setNotes(prevNotes => [responseData.todos, ...prevNotes]);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  }

  const onRemoveToDoHandler = async (toDoId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todo/${toDoId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setNotes((prevNotes) => prevNotes.filter((todo) => todo.id !== toDoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  const onEditToDoHandler = (editToDoItem: Todo) => {
    setIsEdtting(true)

    setEditNotes({
      title:editToDoItem.title,
      description:editToDoItem.description,
      id:editToDoItem.id
    })
  }

  const updateToDo = async (updateToDoItem:Todo) => {
    setIsEdtting(false);

    try {
      const response = await fetch(`http://localhost:5000/api/todo/${updateToDoItem.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updateToDoItem.title,
          description: updateToDoItem.description,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
  
      const responseData = await response.json();
      const updatedTodo = responseData.todos;
  
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === updatedTodo.id ? updatedTodo : n))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
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
