
//1. import dependencias y modulos necesarios
import { comentarioModel } from "../models/comments.model.js";

//Definir las aciones que van a realizar - CRUD

//1. Metodo para Crear un producto -> POST
export const postComment = async (req, res) => {
    try {
        await comentarioModel.create(req.body);
        return res.status(201).json({
            "mensaje": "Comentario creado correctamente!"
        });

    } catch (error) {
        return res.status(400).json({
            "mensaje": "Ocurrio un error al crear el comentario!",
            "error": error.message || error
        })
    }
};

export const getAllComments = async (req, res) => {
    try {
        const allComments = await comentarioModel.find().populate("usuario", "nombre fotoPerfil");
        return res.status(200).json({
            "mensaje": "Se encontraron todos los comentarios!",
            "data": allComments
        });
    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrio un error al mostrar los comentarios!",
            "error": error.message || error
        })
    }
};


export const getCommentsByUserId = async (req, res) => {
    try {
        const { usuarioId } = req.params;

        const comentarios = await comentarioModel.find({ usuario: usuarioId })
            .populate('usuario', 'nombre email')
            

        if (!comentarios.length) {
            return res.status(404).json({ mensaje: "No hay comentarios para este usuario" });
        }

        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los comentarios del usuario", error });
    }
};


export const putCommentById = async (req, res) => {
    try {
        const idForUpdate = req.params.id;
        const dataForUpdate = req.body;
        await comentarioModel.findByIdAndUpdate(idForUpdate, dataForUpdate);
        return res.status(200).json({
            "mensaje": "Comentario actualizado correctamente!"
        });

    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrio un error al actualizar el comentario!",
            "error": error.message || error
        })
    }
};

export const deleteCommentById = async (req, res) => {
    try {
        const idForDelet = req.params.id;
        await comentarioModel.findByIdAndDelete(idForDelet);
        return res.status(200).json({
            "mensaje": "Comentario eliminado correctamente!"
        });

    } catch (error) {
        res.status(400).json({
            "mensaje": "Ocurrio un error al eliminar el comentario!",
            "error": error.message || error
        })
    }
};