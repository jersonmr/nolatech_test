import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import db from "./config/db.js";

const app = express();

app.use( express.urlencoded({ extended: true,}) );
app.use( cookieParser() );
app.use( csrf({ cookie: true, }) );

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

// Public folder
app.use(express.static('public'))

// Routing
app.use('/auth', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});