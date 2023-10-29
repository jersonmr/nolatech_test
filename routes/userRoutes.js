import express from "express";
import { forgotPasswordForm, loginForm, register, registerForm } from "../Controllers/UserController.js";
import { verifyEmail } from "../Controllers/VerifyEmailController.js";

const router = express.Router();

router.get('/login', loginForm);
router.get('/register', registerForm);
router.post('/register', register);
router.get('/forgot-password', forgotPasswordForm);
router.get('/verify-email/:token', verifyEmail);

export default router;