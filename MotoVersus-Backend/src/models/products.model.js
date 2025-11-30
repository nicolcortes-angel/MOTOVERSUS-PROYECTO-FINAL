//1. Importamos mongoose
import mongoose from "mongoose";

//2. Definimos el esquema (estructura) del documento
const productoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    cilindraje: {
        type: String,
        required: true
    },
    motor: {
        type: String,
        required: true
    },
    potencia: {
        type: String, // Puede almacenar "16.5 HP @ 8500 RPM"
        required: true
    },
    transmision: {
        type: String,
        required: true
    },
    peso: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    },
    imagenUrl: {
        type: String,
        required: true // URL o ruta del archivo de imagen
    },
    categoria: {
        type: String,
        enum: ["Deportivas", "Enduro", "Automáticas"],
        required: true
    }
});

export const productoModel = mongoose.model("Productos", productoSchema);
