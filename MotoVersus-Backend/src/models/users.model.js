//1. importamos mongoose
import mongoose from "mongoose";


//2. Definir el schema (estructura) del documento
const usuarioSchema = new mongoose.Schema({

    nombre: {
        type: String, // el tipo de dato la primera en mayusucla
        required: true
    },
    apellido: {
        type: String,
        required: true
    },

    user: {
        type: String,
        required: true
    },

    contrasena: {
        type: String,
        required: true
    },

    correo: {
        type: String,
        required: true
    },

    numero: {
        type: Number,
        required: true
    },
    fotoPerfil: {
        type: String,
        default: "http://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
        role:{
        type: String,
        enum:["admin", "user"],
        required: true         
    }
});

export const usuarioModel = mongoose.model("Usuarios", usuarioSchema);