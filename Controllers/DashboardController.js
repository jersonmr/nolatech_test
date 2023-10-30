const admin = (req, res) => {
    return res.render('dashboard', {
        title: 'Dashboard',
        name: req.user.name,
    });
}

export {admin}