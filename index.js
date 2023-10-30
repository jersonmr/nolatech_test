import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";

import userRoutes from "./routes/userRoutes.js";
import appRoutes from "./routes/appRoutes.js";
import db from "./config/db.js";

const app = express();

app.use( express.urlencoded({ extended: true,}) );
app.use( cookieParser() );
app.use( csrf({ cookie: true, }) );
app.use(session({
    secret:'flashnolatech',
    saveUninitialized: true,
    resave: true,
}));

app.use(flash());

// Database connection
try {
    await db.authenticate();
    db.sync();
    console.log('Conexión correcta a la Base de Datos');
} catch (error) {

}

// Enable Pug
app.set('view engine', 'pug');
app.set('views', './views');

app.use(function(req, res, next){
    res.locals.message = req.flash();
    next();
});

// Public folder
app.use(express.static('public'))

// Routing
app.get('/', (req, res) => res.redirect('/auth/login'));
app.use('/auth', userRoutes);
app.use('/', appRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});