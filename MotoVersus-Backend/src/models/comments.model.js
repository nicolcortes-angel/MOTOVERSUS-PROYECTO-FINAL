//1. importamos mongoose
import mongoose from "mongoose";

//2. Definimos el esquema (estructura) del documento
const comentarioSchema = new mongoose.Schema({

  texto: {
    type: String,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuarios",
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

export const comentarioModel = mongoose.model("Comentarios", comentarioSchema);