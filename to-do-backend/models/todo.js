"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const toDoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});
const ToDoModel = mongoose_1.default.model('Todo', toDoSchema);
exports.default = ToDoModel;
// import mongoose, { Document, Schema } from 'mongoose';
// interface ToDo {
//   title: string;
//   description: string;
// }
// interface ToDoDocument extends ToDo, Document {}
// const toDoSchema = new Schema<ToDoDocument>({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
// });
// const ToDoModel = mongoose.model<ToDoDocument>('Todo', toDoSchema);
// export default ToDoModel;
