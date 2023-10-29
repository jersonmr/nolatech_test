import express from "express";

import { loginForm, login } from "../Controllers/LoginController.js";
import { register, registerForm } from "../Controllers/RegisterController.js";
import { verifyEmail } from "../Controllers/VerifyEmailController.js";
import { resetPasswordForm, forgotPasswordForm, forgotPassword, storeResetPassword } from "../Controllers/PasswordController.js";

const router = express.Router();

router.get('/login', loginForm);
router.post('/login', login);

router.get('/register', registerForm);
router.post('/register', register);

router.get('/verify-email/:token', verifyEmail);

router.get('/forgot-password', forgotPasswordForm);
router.post('/forgot-password', forgotPassword);

router.get('/reset-password/:token', resetPasswordForm);
router.post('/reset-password/:token', storeResetPassword);

export default router;