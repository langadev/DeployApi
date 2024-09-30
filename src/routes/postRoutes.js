import postController from '../controllers/postController.js';
import {auth} from '../middleware/auth.js';
import express from 'express';
import { Multer } from '../config/multerPosts.js';
import uploadImage from '../service/firebase.js';

const postRoutes = express.Router();
postRoutes.get('/index', postController.index);
postRoutes.post('/create',Multer.single('foto'),uploadImage, postController.store)
postRoutes.get('/show?:id', postController.show)

export default postRoutes;
