import express from "express";
import { admin } from "../Controllers/DashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { editUser, editUserForm } from "../Controllers/UserController.js";

const router = express.Router();

router.get('/dashboard', authMiddleware, admin);

router.get('/edit-user', authMiddleware, editUserForm);
router.post('/edit-user', authMiddleware, editUser);

export default router;
