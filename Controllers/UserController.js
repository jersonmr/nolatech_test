import { check, matchedData, validationResult } from "express-validator";
import User from "../models/User.js"
import { Op } from "sequelize";

const editUserForm = async (req, res) => {
    const user = await User.findByPk(req.user.id);

    res.render('user/edit', {
        title: 'Editar usuario',
        user,
        csrf: req.csrfToken(),
    })
}

const editUser = async (req, res) => {
    const user = await User.findByPk(req.user.id);

    await check('name').notEmpty().withMessage('El nombre no puede estar vacío').run(req);
    await check('surname').notEmpty().withMessage('El apellido no puede estar vacío').run(req);

    let result = validationResult(req);

    if (!result.isEmpty()) {
        return res.render('user/edit', {
            title: 'Editar usuario',
            errors: result.array(),
            user: matchedData(req),
            csrf: req.csrfToken(),
        });
    }

    const { name, surname } = req.body;

    user.name = name;
    user.surname = surname;

    await user.save();

    res.redirect('/dashboard');
}

export {editUserForm, editUser}