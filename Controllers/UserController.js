import { check, matchedData, validationResult } from "express-validator";
import User from '../models/User.js';
import { Op } from "sequelize";
import { generateId } from "../helpers/tokens.js";

const loginForm = (req, res) => {
    res.render('auth/login', {
        title: "Iniciar sesión",
    });
}

const registerForm = (req, res) => {
    res.render('auth/register', {
        title: 'Registrar cuenta',
    });
}

const forgotPasswordForm = (req, res) => {
    res.render('auth/forgot_password', {
        title: '¿Olvidaste tu contraseña?',
    });
}

const register = async (req, res) => {
    await check('name').notEmpty().withMessage('El nombre no puede estar vacío').run(req);
    await check('surname').notEmpty().withMessage('El apellido no puede estar vacío').run(req);
    await check('username').notEmpty().withMessage('El nombre de usuario no puede estar vacío').run(req);
    await check('email').isEmail().withMessage('El correo electrónico debe tener un formato válido').run(req);
    await check('password').isLength({ min: 6 }).withMessage('La contraseña debe contener al menos 6 caracteres').run(req);
    await check('password_confirmation').custom((value, { req }) => {
        return value === req.body.password;
    }).withMessage('Las contraseñas no coinciden').run(req);

    let result = validationResult(req);

    if (!result.isEmpty()) {
        return res.render('auth/register', {
            title: 'Registrar cuenta',
            errors: result.array(),
            user: matchedData(req)
            // user: {
            //     name: req.body.name,
            //     surname: req.body.surname,
            //     username: req.body.username,
            //     email: req.body.email,
            // }
        });
    }

    const userExists = await User.findOne({
        where: {
            [Op.or]: {
                email: {
                    [Op.eq]: req.body.email
                },
                username: {
                    [Op.eq]: req.body.username
                }
            }
        }
    })

    if (userExists) {
        return res.render('auth/register', {
            title: 'Registrar cuenta',
            errors: [{ msg: 'El usuario ya se encuentra registrado' }],
            user: matchedData(req)
        });
    }

    // res.json(result.array());

    const user = await User.create(req.body);

    res.json(user);
}

export {loginForm, registerForm, forgotPasswordForm, register}