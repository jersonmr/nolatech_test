import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateId } from "../helpers/tokens.js";
import { forgotPasswordEmail } from "../helpers/emails.js";

const forgotPasswordForm = (req, res) => {
    res.render('auth/forgot_password', {
        title: '¿Olvidaste tu contraseña?',
        csrf: req.csrfToken(),
    });
}

const forgotPassword = async (req, res) => {
    await check('email').isEmail().withMessage('El correo electrónico debe tener un formato válido').run(req);

    let result = validationResult(req);

    if (!result.isEmpty()) {
        return res.render('auth/forgot_password', {
            title: '¿Olvidaste tu contraseña?',
            errors: result.array(),
            csrf: req.csrfToken(),
        });
    }

    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.render('auth/forgot_password', {
            title: '¿Olvidaste tu contraseña?',
            errors: [{ msg: 'El email no pertenece a ningún usuario registrado' }],
            csrf: req.csrfToken(),
        });
    }

    user.token = generateId();
    await user.save();

    forgotPasswordEmail({
        email: user.email,
        name: user.name,
        surname: user.surname,
        token: user.token,
    });

    return res.render('auth/response', {
        title: '¡Restablece tu contraseña!',
        message: 'Hemos enviado un email con las instrucciones',
    });
}

const resetPasswordForm = async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({ where: {token} });

    if (!user) {
        return res.render('auth/response', {
            title: '¡Restablece tu contraseña!',
            message: 'Hubo un error al validar tu información, intenta de nuevo',
            error: true,
        });
    }

    return res.render('auth/reset_password', {
        title: '¡Restablece tu contraseña!',
        csrf: req.csrfToken(),
    });
}

const storeResetPassword = async (req, res) => {
    await check('password').isLength({ min: 6 }).withMessage('La contraseña debe contener al menos 6 caracteres').run(req);

    let result = validationResult(req);

    if (!result.isEmpty()) {
        return res.render('auth/reset_password', {
            title: '¡Restablece tu contraseña!',
            errors: result.array(),
            csrf: req.csrfToken(),
        });
    }

    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ where: {token} });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.token = null;
    await user.save();

    return res.render('auth/response', {
        title: '¡Contraseña restablecida!',
        message: 'La contraseña se guardó correctamente',
    });
}

export {forgotPasswordForm, forgotPassword, resetPasswordForm, storeResetPassword}