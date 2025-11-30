//1. importacion de dependecias y modulos 
import express from "express"; 
import { postProduct, getProducts, putProduct, deleteProductById, getProductsbyCategory } from "../controllers/products.controller.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../config/multer.js";


//2. Configurar las rutas 
export const productRouter = express.Router();

//3. Ruta para el POST 
productRouter.post("/crear", auth("admin"), upload.single("imagenUrl"), postProduct);

//3. Ruta para el GET
productRouter.get("/mostrar", getProducts);

productRouter.get("/mostrar/:category", getProductsbyCategory);

//3. Ruta para el PUT
productRouter.put("/actualizar/:id", auth("admin"), upload.single("imagenUrl"),putProduct);

//3. Ruta para el DELETE
productRouter.delete("/eliminar/:id", auth("admin"),deleteProductById);