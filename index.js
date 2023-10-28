import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Enable Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Routing
app.use('/auth', userRoutes);

const port = 3000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});