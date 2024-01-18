import { useRef, type FormEvent } from "react";

interface createToDoProps {
  onAddTodo: (titlePass: string, descriptionPass: string) => void;
}

const NewTodo: React.FC<createToDoProps> = ({ onAddTodo }) => {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredTitle = title.current!.value;
    const enteredDescription = description.current!.value;

    if (enteredTitle.trim().length === 0 ||enteredDescription.trim().length === 0) {
      return;
    }

    e.currentTarget.reset();
    onAddTodo(enteredTitle, enteredDescription);

    
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="mt-3 border rounded-lg w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
        ref={title}
        placeholder="Title"
      />
      <textarea
        className="mt-3 border rounded-lg w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
        rows={3}
        placeholder="Description"
        ref={description}
      ></textarea>
      <button className="border-2 border-amber-800 bg-amber-800 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-amber-800 font-semibold">
        Save
      </button>
    </form>
  );
};

export default NewTodo;
