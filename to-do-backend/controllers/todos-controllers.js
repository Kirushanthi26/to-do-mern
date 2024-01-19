"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToDo = exports.patchToDo = exports.postToDo = exports.getToDo = void 0;
const http_error_1 = require("../models/http-error");
const express_validator_1 = require("express-validator");
const todo_1 = __importDefault(require("../models/todo"));
let todos = [
    {
        id: "123",
        title: "complete react project",
        description: "MERN stack project",
    },
];
const getToDo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let todoList;
    try {
        todoList = yield todo_1.default.find();
    }
    catch (error) {
        const err = new http_error_1.HttpError("somthing went wrong, could not find a todo", 500);
        return next(err);
    }
    if (!todoList || todoList.length === 0) {
        return next(new http_error_1.HttpError("Could not find a To Do Items.", 404));
    }
    res
        .status(200)
        .json({ todos: todoList.map((n) => n.toObject({ getters: true })) });
});
exports.getToDo = getToDo;
const postToDo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return next(new http_error_1.HttpError("invalid input", 422));
    }
    const { title, description } = req.body;
    const newToDo = new todo_1.default({
        title,
        description,
    });
    try {
        yield newToDo.save();
    }
    catch (error) {
        const err = new http_error_1.HttpError("creating todo failed, please try again", 500);
        return next(err);
    }
    res.status(201).json({ todos: newToDo });
});
exports.postToDo = postToDo;
const patchToDo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return next(new http_error_1.HttpError("invalid input", 422));
    }
    const { title, description } = req.body;
    const toDoId = req.params.todoId;
    let todoitem;
    try {
        todoitem = yield todo_1.default.findById(toDoId);
    }
    catch (error) {
        const err = new http_error_1.HttpError("somthing went wrong, could not find a todo", 500);
        return next(err);
    }
    todoitem.title = title;
    todoitem.description = description;
    try {
        yield todoitem.save();
    }
    catch (error) {
        const err = new http_error_1.HttpError("updating todo failed, please try again", 500);
        return next(err);
    }
    return res.status(200).json({ todos: todoitem.toObject({ getters: true }) });
});
exports.patchToDo = patchToDo;
const deleteToDo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const toDoId = req.params.todoId;
    let todoItem;
    try {
        todoItem = yield todo_1.default.findById(toDoId);
    }
    catch (error) {
        const err = new http_error_1.HttpError("somthing went wrong, could not find a todo", 500);
        return next(err);
    }
    try {
        yield todoItem.deleteOne();
    }
    catch (error) {
        const err = new http_error_1.HttpError("deleting todo failed, please try again", 500);
        return next(err);
    }
    res.status(200).json({ message: "todo deleted successfully" });
});
exports.deleteToDo = deleteToDo;
