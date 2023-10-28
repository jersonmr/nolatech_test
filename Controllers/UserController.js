
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

export {loginForm, registerForm, forgotPasswordForm}