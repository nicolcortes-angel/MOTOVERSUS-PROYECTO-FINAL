import express from 'express';
import { auth } from "../middleware/auth.js";
import { potUsers, getAllUsers, putUserById, deleteUserById, getUserById } from '../controllers/user.controller.js';
import { upload } from '../config/multer.js';

// 2. configurar el router
export const userRouter = express.Router();

// 3. definir las rutas
userRouter.post("/crear", upload.single("fotoPerfil"), potUsers);
userRouter.get("/mostrar", auth("admin"), getAllUsers);
userRouter.get("/mostrar/:id", getUserById);
userRouter.put("/actualizar/:id", upload.single("fotoPerfil"), putUserById);
userRouter.delete("/eliminar/:id", deleteUserById);