import Todo from "../model/Todo.tsx";
import { useState } from "react";

interface ToDoItemsProps {
  id: string;
  title: string;
  description: string;
  onRemoveToDo: (id: string) => void;
  onEditToDo: (editToDoItem: Todo) => void;
}

const TodoItems: React.FC<ToDoItemsProps> = ({
  title,
  description,
  id,
  onRemoveToDo,
  onEditToDo,
}) => {
  const [isHide, setIsHide] = useState<boolean>(false);

  const hideHandler = () => {
    setIsHide((prevIsHide) => !prevIsHide);
  };

  return (
    <article className="text-center bg-gray-200 rounded-md p-5" key={id}>
      <div onClick={hideHandler}>
        <h2 className="text-2xl capitalize font-medium pb-2">{title}</h2>
      </div>
      {isHide && (
        <>
          <p>{description}</p>
          <button
            onClick={() => onEditToDo({ id, title, description })}
            className="border-2 border-green-950 bg-green-950 text-white py-2 w-1/4 mx-2 mt-5 rounded-md hover:bg-transparent hover:text-green-950 font-semibold"
          >
            Edit
          </button>
          <button
            onClick={() => onRemoveToDo(id)}
            className="border-2 border-red-600 bg-red-600 text-white py-2 w-1/4 mx-2 mt-5 rounded-md hover:bg-transparent hover:text-red-600 font-semibold"
          >
            Delete
          </button>
        </>
      )}
    </article>
  );
};

export default TodoItems;
