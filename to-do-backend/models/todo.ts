import mongoose from "mongoose";

const Schema = mongoose.Schema;


const toDoSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
});

const ToDoModel = mongoose.model('Todo', toDoSchema)
export default ToDoModel;

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