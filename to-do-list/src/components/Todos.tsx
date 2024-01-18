import TodoItems from "./TodoItems.tsx";

const Todos = () => {
  return (
    <ul className="grid grid-cols-2 gap-4 mt-4">
      <TodoItems
        title="finish todo app"
        description="use react and typescript for developement."
      />
    </ul>
  );
};

export default Todos;
