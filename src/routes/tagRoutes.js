import tagController from '../controllers/tagsController';

import express from 'express';

const tagRouter = express.Router();

tagRouter.post('/create', tagController.store);
tagRouter.get('/index', tagController.index);
tagRouter.delete('/delete?:id', tagController.delete);
tagRouter.get('/show?:id', tagController.show);
tagRouter.post('/update?:id',tagController.update);

export default tagRouter;