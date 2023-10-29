import express from "express";
import { loginForm, register, registerForm } from "../Controllers/UserController.js";
import { verifyEmail } from "../Controllers/VerifyEmailController.js";
import { create, forgotPasswordForm, forgotPassword, store } from "../Controllers/PasswordController.js";

const router = express.Router();

router.get('/login', loginForm);
router.get('/register', registerForm);
router.post('/register', register);

router.get('/verify-email/:token', verifyEmail);

router.get('/forgot-password', forgotPasswordForm);
router.post('/forgot-password', forgotPassword);

router.get('/reset-password/:token', create);
router.post('/reset-password/:token', store);

export default router;