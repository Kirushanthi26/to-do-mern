import { Router } from "express";
import {getToDo, postToDo, patchToDo, deleteToDo } from "../controllers/todos-controllers";
import { check } from "express-validator";

const router = Router();

router.get("/", getToDo);

router.post(
  "/todo",
  [check("title").not().isEmpty()],
  postToDo
);

router.patch(
  "/todo/:todoId",
  [check("title").not().isEmpty()],
  patchToDo
);

router.delete("/todo/:todoId", deleteToDo);

export default router;
