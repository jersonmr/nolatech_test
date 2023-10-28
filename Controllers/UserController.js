
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

export {loginForm, registerForm}