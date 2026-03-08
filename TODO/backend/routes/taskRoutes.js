import express from "express";
import { createTask, getTasks, getSingleTask, updateTask, deleteTask, deleteMultipleTasks, generateSubTasks, updateSubTaskStatus, getTaskAdvice } from "../controllers/taskController.js";
import { verifyJWTToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add-task", verifyJWTToken, createTask);
router.get("/tasks", verifyJWTToken, getTasks);
router.get("/task/:id", verifyJWTToken, getSingleTask);
router.put("/task/:id", verifyJWTToken, updateTask);
router.delete("/tasks/:id", verifyJWTToken, deleteTask);
router.delete("/delete-multiple", verifyJWTToken, deleteMultipleTasks);
router.post("/task/:id/generate-subtasks", verifyJWTToken, generateSubTasks);
router.put("/task/:id/subtask/:subtaskId", verifyJWTToken, updateSubTaskStatus);
router.get("/task/:id/advice", verifyJWTToken, getTaskAdvice);

export default router;
