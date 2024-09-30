import multer from 'multer';
// import { extname, resolve } from 'path';

// const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

// export default {
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
//       return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPG.'));
//     }

//     return cb(null, true);
//   },
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, resolve(__dirname, '..', '..', '..', 'client','uploads','posts'));
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
//     },
//   }),
// };
export const Multer = multer({
  storage:multer.memoryStorage(),
  limits: 1024*1024
  
})
