import express from "express";

import {
  createTask,
  getTasks,
  deleteTask,
  toggleTask,
  updateTask,
  getTaskById   
} from "../controllers/task.controller";

import { authenticateToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authenticateToken, createTask);

router.get("/", authenticateToken, getTasks);

router.get("/:id", authenticateToken, getTaskById);

router.patch("/:id", authenticateToken, updateTask);

router.patch("/:id/toggle", authenticateToken, toggleTask);

router.delete("/:id", authenticateToken, deleteTask);





export default router;