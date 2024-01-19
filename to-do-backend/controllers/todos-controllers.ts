import { Request, Response, NextFunction } from "express";
import { ToDos } from "../models/todos";
import { HttpError } from "../models/http-error";
import { validationResult } from "express-validator";
import ToDoModel from "../models/todo";

let todos: ToDos[] = [
  {
    id: "123",
    title: "complete react project",
    description: "MERN stack project",
  },
];

export const getToDo = async (req: Request,res: Response,next: NextFunction) => {
  let todoList;
  try {
    todoList = await ToDoModel.find();
  } catch (error) {
    const err = new HttpError(
      "somthing went wrong, could not find a todo",
      500
    );
    return next(err);
  }

  if (!todoList || todoList.length === 0) {
    return next(new HttpError("Could not find a To Do Items.", 404));
  }

  res
    .status(200)
    .json({ todos: todoList.map((n) => n.toObject({ getters: true })) });
};

export const postToDo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("invalid input", 422));
  }

  const { title, description } = req.body;

  const newToDo = new ToDoModel({
    title,
    description,
  });

  try {
    await newToDo.save();
  } catch (error) {
    const err = new HttpError("creating todo failed, please try again", 500);
    return next(err);
  }

  res.status(201).json({ todos: newToDo });
};

export const patchToDo = async (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("invalid input", 422));
  }

  const { title, description } = req.body;
  const toDoId = req.params.todoId;

  let todoitem;
  try {
    todoitem = await ToDoModel.findById(toDoId);
  } catch (error) {
    const err = new HttpError("somthing went wrong, could not find a todo",500);
    return next(err);
  }

  todoitem!.title = title;
  todoitem!.description = description;

  try {
    await todoitem!.save();
  } catch (error) {
    const err = new HttpError("updating todo failed, please try again", 500);
    return next(err);
  }
  return res.status(200).json({ todos: todoitem!.toObject({ getters: true }) });
};

export const deleteToDo = async (req: Request, res: Response, next: NextFunction) => {
  const toDoId = req.params.todoId;

  let todoItem;
  try {
    todoItem = await ToDoModel.findById(toDoId);
  } catch (error) {
    const err = new HttpError("somthing went wrong, could not find a todo",500);
    return next(err);
  }

  try {
    await todoItem!.deleteOne();
  } catch (error) {
    const err = new HttpError("deleting todo failed, please try again", 500);
    return next(err);
  }

  res.status(200).json({ message: "todo deleted successfully"});
};
