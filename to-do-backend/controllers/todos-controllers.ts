import { Request, Response, NextFunction } from "express";
import { ToDos } from "../models/todos";
import { HttpError } from "../models/http-error";

let todos: ToDos[] = [
    {
        id: '123',
        title: "complete react project",
        description:"MERN stack project"
    }
];

export const getToDo = (req: Request, res: Response, next: NextFunction) => {
  if (!todos || todos.length === 0) {
    return next(new HttpError("Could not find a To Do Items.", 404));
  }

  res.status(200).json({ todos: todos });
};

export const postToDo = (req: Request, res: Response, next: NextFunction) => {
  const newToDo: ToDos = {
    id: new Date().toISOString(),
    title: req.body.title,
    description: req.body.description
  };

  todos.push(newToDo);
  res.status(201).json({ message: "added todo", todos: todos });
};

export const patchToDo = (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.body;
  const toDoId = req.params.todoId;

  const toDoIndex = todos.findIndex((n) => n.id === toDoId);

  if (toDoIndex >= 0) {
    todos[toDoIndex] = {
      id: todos[toDoIndex].id,
      title: title,
      description: description,
    };
    return res.status(200).json({ todos: todos });
  }

  return next(new HttpError("Could not find a To Do Item for this id", 404));
};

export const deleteToDo = (req: Request, res: Response, next: NextFunction) => {
  const toDoId = req.params.todoId;

  if (!todos.find((n) => n.id === toDoId)) {
    return next(new HttpError("could not find a todo for that id", 404));
  }

  todos = todos.filter((n) => n.id !== toDoId);

  res.status(200).json({ message: "todo deleted successfully", todos: todos });
};
