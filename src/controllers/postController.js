const Model = require('../models');
import multer from 'multer';
import multerConfig from '../config/multerPosts';
//const upload = multer(multerConfig).single('foto');
require('dotenv').config()
const Posts = Model.Posts;
const User = Model.User;
module.exports ={
    async index(req, res){
        const post = await Posts.findAll({
          order: [
            ['id', 'DESC'],
            
        ],
          include:[User]
        });
        return res.json(post);

    },
    async show(req, res){
        try{
            const {id} = req.params;
            if(!id){
                return res.status(400).json({
                    errors:['Faltando ID']
                })
            }
            const post = await Posts.findByPk(id, {include:[User]})
            if(!post){
                return res.status(400).json({
                    errors:['Post nao existe']
                })
            }
            return res.status(200).json(post);

        }catch(e){
            return res.status(400).json({
                errors: e.message,
              });
        }
      },
    
      async store(req, res) {
        try {
          // upload(req, res, async (error) => {
          //   if (error) {
          //     return res.status(400).json({
          //       errors: [error.message], 
          //     });
          //   }
      
          //   const { file } = req;
          //   if (!file) {
          //     return res.status(400).json({
          //       errors: ['No file uploaded'],
          //     });
          //   }
      
            const { firebaseUrl } = req.file? req.file:'';
            const { title, content, user_id } = req.body;
      
            if (!title || !user_id) {
              return res.status(400).json({ error: 'Dados incompletos' });
            }
      
            
            const newPost = { title, content, image: firebaseUrl, user_id };
            const post = await Posts.create(newPost);
      
            
            return res.status(201).json({ post });
       
        } catch (error) {
       
          console.error('Error creating post:', error);
      
          
          return res.status(500).json({ error: 'Erro no servidor. Por favor, tente novamente mais tarde.' });
        }
      },
      
    async update(req, res){
        try{
            const { id } = req.params;
            if(!id){
                return res.status(400).json({
                    errors:['Faltado o ID']
                })
            }
            const post = await Posts.findByPk(id);
            if(!post){
                return res.status(400).json({
                    errors:['Post nao existe']
                })
            }
            const updatedPost= await post.update(req.body);
            return res.json(updatedPost);
        }catch(e){
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
              });
        }
      },
    async delete(req,res){
        try{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                errors:['Faltando ID']
            });
            
            
            }
            const post = await Posts.findByPk(id);
            if(!post)
                {
                    return res.status(400).json({
                        errors:['Post nao existe']
                    });
                }
                await post.destroy();
                return res.status(200).json({
                    apagado:true
                });
        }catch(e){
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
              });
        }
      },
}