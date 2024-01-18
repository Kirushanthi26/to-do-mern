import Todo from "../model/Todo.tsx";
import TodoItems from "./TodoItems.tsx";

interface NotesListProps {
  notes: Todo[];
  onRemoveToDo: (id: number) => void
}

const Todos: React.FC<NotesListProps> = ({ notes, onRemoveToDo }) => {
  return (
    <ul className="grid grid-cols-2 gap-4 mt-4">
      {notes.map((item) => (
        <TodoItems
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          onRemoveToDo={onRemoveToDo}
        />
      ))}
    </ul>
  );
};

export default Todos;
