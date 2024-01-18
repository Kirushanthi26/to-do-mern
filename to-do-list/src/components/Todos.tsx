import TodoItems from "./TodoItems.tsx";

const Todos = () => {
  return (
    <ul>
      <TodoItems
        title="finish todo app"
        description="use react and typescript for developement"
      />
    </ul>
  );
};

export default Todos;
