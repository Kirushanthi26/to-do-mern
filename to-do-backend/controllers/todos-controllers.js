"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToDo = exports.patchToDo = exports.postToDo = exports.getToDo = void 0;
const http_error_1 = require("../models/http-error");
let todos = [
    {
        id: '123',
        title: "complete react project",
        description: "MERN stack project"
    }
];
const getToDo = (req, res, next) => {
    if (!todos || todos.length === 0) {
        return next(new http_error_1.HttpError("Could not find a To Do Items.", 404));
    }
    res.status(200).json({ todos: todos });
};
exports.getToDo = getToDo;
const postToDo = (req, res, next) => {
    const newToDo = {
        id: new Date().toISOString(),
        title: req.body.title,
        description: req.body.description
    };
    todos.push(newToDo);
    res.status(201).json({ message: "added todo", todos: todos });
};
exports.postToDo = postToDo;
const patchToDo = (req, res, next) => {
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
    return next(new http_error_1.HttpError("Could not find a To Do Item for this id", 404));
};
exports.patchToDo = patchToDo;
const deleteToDo = (req, res, next) => {
    const toDoId = req.params.todoId;
    if (!todos.find((n) => n.id === toDoId)) {
        return next(new http_error_1.HttpError("could not find a todo for that id", 404));
    }
    todos = todos.filter((n) => n.id !== toDoId);
    res.status(200).json({ message: "todo deleted successfully", todos: todos });
};
exports.deleteToDo = deleteToDo;
