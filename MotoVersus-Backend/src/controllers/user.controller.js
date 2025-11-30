import { usuarioModel } from "../models/users.model.js";
import bcryptjs from "bcryptjs";

// 1. Crear un usuario (POST)
export const potUsers = async (request, response) => {
    try {
        //validar que venga el archivo enviado por el cliente
        if (!request.file) {
            return response.status(400).json({
                "mensaje": "Debes subir un archivo de imagen"
            });
        };

        const codedPassword = await bcryptjs.hash(request.body.contrasena, 10);

        // crear el nuevo usuario con la contraseña encriptada
        const newUser = {
            ...request.body,
            contrasena: codedPassword,
            fotoPerfil: `/uploads/${request.file.filename}`,
        };

        await usuarioModel.create(newUser)
        return response.status(201).json({
            "mensaje": "Usuario creado correctamente"
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "ocurrio un error al crear el usuario",
            "error": error.message || error
        });
    }
};

// 2. Obtener todos los usuarios (GET)
export const getAllUsers = async (request, response) => {
    try {
        const allUsers = await usuarioModel.find();
        return response.status(200).json({
            "mensaje": "Petición Exitosa",
            "data": allUsers
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "ocurrio un error al mostrar los usuarios",
            "error": error.message || error
        });
    }
};

//2.1 Obtener un usuario por ID (GET)
export const getUserById = async (request, response) => {
    try {
        const idForSearch = request.params.id;
        const userById = await usuarioModel.findById(idForSearch).select('-contrasena');
        return response.status(200).json({
            "mensaje": "Petición Exitosa",
            "data": userById
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "ocurrio un error al mostrar el usuario",
            "error": error.message || error
        });
    }
};
// 3. Actualizar un usuario por ID (PUT)
export const putUserById = async (request, response) => {
    try {
        const idForUpdate = request.params.id;

        // Validar archivo
        if (!request.file) {
            return response.status(400).json({
                mensaje: "Debes subir un archivo de imagen"
            });
        }

        // Encriptar contraseña si se envió
        let codedPassword;
        if (request.body.contrasena) {
            codedPassword = await bcryptjs.hash(request.body.contrasena, 10);
        }

        // Convertir numero a Number si viene
        let numero = request.body.numero !== undefined ? Number(request.body.numero) : undefined;
        if (numero !== undefined && isNaN(numero)) {
            return response.status(400).json({ mensaje: "El campo 'numero' debe ser un número válido" });
        }

        // Crear objeto actualizado
        const updatedUser = {
            ...request.body,
            numero,
            contrasena: codedPassword,
            fotoPerfil: `/uploads/${request.file.filename}`
        };

        // Eliminar campos undefined para no sobrescribir
        Object.keys(updatedUser).forEach(
            key => updatedUser[key] === undefined && delete updatedUser[key]
        );

        await usuarioModel.findByIdAndUpdate(idForUpdate, updatedUser);

        return response.status(200).json({
            mensaje: "Usuario actualizado correctamente"
        });

    } catch (error) {
        return response.status(400).json({
            mensaje: "ocurrio un error al actualizar usuario",
            error: error.message || error
        });
    }
};

// 4. Eliminar un usuario por ID (DELETE)
export const deleteUserById = async (request, response) => {
    try {
        const idForDelete = request.params.id;
        await usuarioModel.findByIdAndDelete(idForDelete);
        return response.status(200).json({
            "mensaje": "Usuario eliminado correctamente"
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "ocurrio un error al eliminar usuario",
            "error": error.message || error
        });
    }
};