import User from "../models/User.js";

const verifyEmail = async (req, res, next) => {
    const { token } = req.params;

    const user = await User.findOne({ where: {token} });

    if (!user) {
        return res.render('auth/response', {
            title: '¡Error al confirmar tu cuenta!',
            message: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true,
        });
    }

    user.token = null;
    user.emailVerifiedAt = new Date();
    await user.save();

    return res.render('auth/response', {
        title: '¡Cuenta confirmada!',
        message: 'La cuenta se confirmo correctamente',
    });
}

export {verifyEmail}