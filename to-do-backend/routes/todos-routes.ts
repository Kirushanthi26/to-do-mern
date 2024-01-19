import { Router } from "express";
import {getToDo, postToDo, patchToDo, deleteToDo} from '../controllers/todos-controllers'

const router = Router();

router.get('/', getToDo)

router.post('/todo', postToDo)

router.patch('/todo/:todoId', patchToDo)

router.delete('/todo/:todoId', deleteToDo)

export default router;