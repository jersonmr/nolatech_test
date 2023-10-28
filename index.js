import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Routing
app.use('/', userRoutes);

app.get('/', function (req, res) {
    res.send('Hola mundo en express');
});

const port = 3000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});