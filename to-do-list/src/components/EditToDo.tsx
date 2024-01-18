import { useEffect, useState, type FormEvent } from "react";
import Todo from "../model/Todo.tsx";

interface editFormProps {
  editNotes: Todo;
  updateToDo: (ToDoDetails: Todo) => void;
  setIsEdtting:(edit:boolean)=>void;
}

const EditToDo: React.FC<editFormProps> = ({ editNotes, updateToDo, setIsEdtting }) => {
  const [toDo, setToDo] = useState<Todo>(editNotes);

  useEffect(() => {
    setToDo(editNotes);
  }, [editNotes, updateToDo]);

  const titleDetailsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDo((prev) => {
      return {
        ...prev,
        title: e.target.value,
      };
    });
  };

  const descriptionDetailsHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setToDo((prev) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    updateToDo(toDo);
  };

  const onCancel = (e: FormEvent) => {
    e.preventDefault();
    setIsEdtting(false)
}

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="mt-3 border rounded-lg w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
        onChange={titleDetailsHandler}
        placeholder="Title"
        value={toDo.title}
      />
      <textarea
        className="mt-3 border rounded-lg w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
        rows={3}
        placeholder="Description"
        onChange={descriptionDetailsHandler}
        value={toDo.description}
      ></textarea>
      <button className="border-2 border-amber-800 bg-amber-800 text-white py-1 mb-2 w-full rounded-md hover:bg-transparent hover:text-amber-800 font-semibold">
        Update
      </button>
      <button onClick={onCancel} className="border-2 border-red-500 bg-red-500 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-red-500 font-semibold">
        Cancel</button>
    </form>
  );
};

export default EditToDo;
