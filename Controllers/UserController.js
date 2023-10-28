
const loginForm = (req, res) => {
    res.render('auth/login', {
        authenticated: false,
    });
}

const registerForm = (req, res) => {
    res.render('auth/register', {
        title: 'Registrar cuenta',
    });
}

export {loginForm, registerForm}