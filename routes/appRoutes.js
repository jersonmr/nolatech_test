import express from "express";
import { admin } from "../Controllers/DashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/dashboard', authMiddleware, admin);

export default router;
