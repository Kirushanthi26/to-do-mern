interface ToDoItemsProps {
  title: string;
  description: string;
}

const TodoItems: React.FC<ToDoItemsProps> = ({ title, description }) => {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button>Edit</button>
      <button>Delete</button>
    </article>
  );
};

export default TodoItems;
