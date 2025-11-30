// 1. Importamos dependencias necesarias
import mongoose from "mongoose";


// 2. Función para conectar a la base de datos MongoDB
export const conexionMongo = async () => {
    try {
        await mongoose.connect(process.env.BD_URL,{dbName:"MotoVersus"});
        console.log("Conexión a la base exitosa");
    } catch (error) {
        console.error("Error de conexión a la base de datos", error);   
    }
}