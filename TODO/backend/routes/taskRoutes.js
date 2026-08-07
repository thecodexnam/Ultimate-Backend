import express from "express";
import { createTask, getTasks, getSingleTask, updateTask, deleteTask, deleteMultipleTasks, generateSubTasks, updateSubTaskStatus, getTaskAdvice, generateDailyPlan, getProductivityInsights, awardFocusXP, sendDailyReport, exportCalendar } from "../controllers/taskController.js";
import { verifyJWTToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Task creation and retrieval routes.
router.post("/add-task", verifyJWTToken, createTask);
router.get("/tasks", verifyJWTToken, getTasks);
router.get("/task/:id", verifyJWTToken, getSingleTask);

// Task modification routes.
router.put("/task/:id", verifyJWTToken, updateTask);
router.delete("/tasks/:id", verifyJWTToken, deleteTask);
router.delete("/delete-multiple", verifyJWTToken, deleteMultipleTasks);

// Subtask and AI assistance routes.
router.post("/task/:id/generate-subtasks", verifyJWTToken, generateSubTasks);
router.put("/task/:id/subtask/:subtaskId", verifyJWTToken, updateSubTaskStatus);
router.get("/task/:id/advice", verifyJWTToken, getTaskAdvice);

// Productivity and reporting routes.
router.get("/daily-plan", verifyJWTToken, generateDailyPlan);
router.get("/productivity-insights", verifyJWTToken, getProductivityInsights);
router.post("/award-focus-xp", verifyJWTToken, awardFocusXP);
router.post("/daily-report", verifyJWTToken, sendDailyReport);
router.get("/export-calendar", verifyJWTToken, exportCalendar);

export default router;
