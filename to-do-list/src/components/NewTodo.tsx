const NewTodo = () => {
  return (
    <form>
      <input
        type="text"
        className="mt-3 border rounded-lg w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
        name=""
        placeholder="Title"
      />
      <textarea
        className="mt-3 border rounded-lg w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
        rows={3}
        placeholder="Description"
      ></textarea>
      <button className="border-2 border-amber-800 bg-amber-800 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-amber-800 font-semibold">
        Save
      </button>
    </form>
  );
};

export default NewTodo;
