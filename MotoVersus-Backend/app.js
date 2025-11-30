// 1. Importamos las dependencias necesarias
import express from 'express';
import dotenv from 'dotenv';
import { conexionMongo } from './src/config/db.js';
import { userRouter } from './src/routes/users.routes.js'; 
import {commentRouter} from './src/routes/comments.routes.js';
import { productRouter } from "./src/routes/products.routes.js";
import { loginRouter } from "./src/routes/login.routes.js";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

// 2. Importamos la configuración de la base de datos
const app = express();
dotenv.config();
const PORT = process.env.PORT;
conexionMongo(); // Llamamos a la función para conectar a la base de datos
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);


//3. funcionalidad para conectar a la base de datos
app.get('/', (request, response) => {
    response.send('Bienvenido a MotoVersus');
});

app.use(cors()); // Middleware para habilitar CORS
app.use(express.json()); // Middleware para parsear JSON
app.use('/users', userRouter); // Middleware para las rutas de usuarios
app.use('/comments', commentRouter);
app.use("/products", productRouter);
app.use("/login", loginRouter);
app.use("/uploads", express.static(path.join(_dirname, "src/uploads")));

//4. Levantamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en el http://localhost:${PORT}`);
});
