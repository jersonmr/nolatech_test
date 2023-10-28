import express from "express";
import userRoutes from "./routes/userRoutes.js";
import db from "./config/db.js";

const app = express();

// Database connection
try {
    await db.authenticate();
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

const port = 3000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});