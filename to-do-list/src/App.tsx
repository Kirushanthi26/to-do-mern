import "./App.css";
import Header from "./components/Header.tsx";
import Todos from "./components/Todos.tsx";
import goalImg from "./assets/goals.jpg";
import NewTodo from "./components/NewTodo.tsx";

const App = () => {
  return (
    <div className="flex justify-center items-center h-auto my-10">
      <main className="w-1/2 h-auto p-6 shadow-lg bg-white rounded-md">
        <Header image={{ src: goalImg, alt: "header image" }}>
          <h1 className="text-3xl font-semibold tracking-widest text-center uppercase text-amber-800">
            To Do List
          </h1>
        </Header>
        <NewTodo />
        <Todos />
      </main>
    </div>
  );
};

export default App;
