import { check, validationResult } from "express-validator";
import User from '../models/User.js';
import { generateJWT } from "../helpers/tokens.js";

const loginForm = (req, res) => {
    return res.render('auth/login', {
        title: "Iniciar sesión",
        csrf: req.csrfToken(),
    });
}

const login = async (req, res) => {
    await check('email').isEmail().withMessage('El correo electrónico es requerido').run(req);
    await check('password').notEmpty().withMessage('La contraseña es requerida').run(req);

    let result = validationResult(req);

    if (!result.isEmpty()) {
        return res.render('auth/login', {
            title: 'Iniciar sesión',
            errors: result.array(),
            csrf: req.csrfToken(),
        });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: {email} })

    if (!user) {
        return res.render('auth/login', {
            title: 'Iniciar sesión',
            errors: [{ msg: 'El usuario no existe' }],
            csrf: req.csrfToken(),
        });
    }

    if (!user.emailVerifiedAt) {
        return res.render('auth/login', {
            title: 'Iniciar sesión',
            errors: [{ msg: 'Tu cuenta no ha sido confirmada' }],
            csrf: req.csrfToken(),
        });
    }

    if (!user.verifyPassword(password)) {
        return res.render('auth/login', {
            title: 'Iniciar sesión',
            errors: [{ msg: 'La contraseña es incorrecta' }],
            csrf: req.csrfToken(),
        });
    }

    const token = generateJWT(user.id);

    return res.cookie('_token', token, {
        httpOnly: true,
    }).redirect('/dashboard')
}

export { loginForm, login }