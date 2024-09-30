import userController from '../controllers/userController.js';
import {auth} from '../middleware/auth.js';
import express from 'express';

const userRoutes = express.Router();
userRoutes.get('/index', userController.index);
userRoutes.post('/create', userController.store)


export default userRoutes;
