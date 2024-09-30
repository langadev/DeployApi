import admin from "firebase-admin"; 

import serviceAccount from "../config/firebase.json"; 
const bucketName = 'fotonode-7321d.appspot.com'; 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucketName
});

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {
  if (!req.file) return next(); 

  const image = req.file;
  const nameArchive = Date.now() + '.' + image.originalname.split('.').pop();
  const file = bucket.file(nameArchive);

  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype
    }
  });

  stream.on('error', (error) => {
    console.error('Error uploading file:', error);
    return res.status(500).send('Failed to upload image');
  });

  stream.on('finish', async () => {
    try {
      await file.makePublic(); 
      req.file.firebaseUrl = `https://storage.googleapis.com/${bucketName}/${nameArchive}`;
      next(); 
    } catch (error) {
      console.error('Error making file public:', error);
      return res.status(500).send('Failed to make file public');
    }
  });

  stream.end(image.buffer); 
};

export default uploadImage; 
