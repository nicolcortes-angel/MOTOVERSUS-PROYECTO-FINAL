import express from 'express';
import { getAllComments, postComment, putCommentById, deleteCommentById, getCommentsByUserId} from '../controllers/comments.controller.js';

export const commentRouter = express.Router();

commentRouter.post('/crear',postComment);

commentRouter.get('/mostrar', getAllComments);

commentRouter.get('/usuario/:usuarioId', getCommentsByUserId); 

commentRouter.put('/actualizar/:id', putCommentById);

commentRouter.delete('/eliminar/:id', deleteCommentById);