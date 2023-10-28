import express from "express";
import { forgotPasswordForm, loginForm, registerForm } from "../Controllers/UserController.js";

const router = express.Router();

router.get('/login', loginForm);
router.get('/register', registerForm);
router.get('/forgot-password', forgotPasswordForm);

export default router;