const Model = require('../models');

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
require('dotenv').config()
const Tags = Model.Tags;
const Post = Model.Posts

module.exports = {
    async index(req, res){
        const tag = await Tags.findAll({
            attributes:['name'], include:[Post]
        })
        return res.json(tag);
    },
    
      
    async store(req, res) {
        try {
           const {name, id_post} = req.body
            if (!name || !id_post ) {
                return res.status(400).json({ error: 'Dados incompletos' });
            }

            // Create a new Tags
           
            const tag = await Tags.create({name, id_post});

            // Respond with the created Tags
            return res.status(201).json({ tag });

        } catch (error) {
            // Log the error for debugging
            console.error('Error creating Tags:', error);

            // Respond with an appropriate error message
            return res.status(500).json({ error: 'Erro no servidor. Por favor, tente novamente mais tarde.' });
        }
    },
    async show(req, res){
        try{
            const {id} = req.params;
            if(!id){
                return res.status(400).json({
                    errors:['Faltando ID']
                })
            }
            const Tags = await Tags.findByPk(id,{
              attributes:['name','email', 'profile_pic']
             
            })
            if(!Tags){
                return res.status(400).json({
                    errors:['Usuario nao existe']
                })
            }
            return res.status(200).json(Tags);

        }catch(e){
            return res.status(400).json({
                errors: e.message,
              });
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
            const Tags = await Tags.findByPk(id);
            if(!Tags){
                return res.status(400).json({
                    errors:['Usuario nao existe']
                })
            }
            const updatedTags = await Tags.update(req.body);
            return res.json(updatedTags);
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
            const Tags = await Tags.findByPk(id);
            if(!Tags)
                {
                    return res.status(400).json({
                        errors:['Usuario nao existe']
                    });
                }
                await Tags.destroy();
                return res.status(200).json({
                    apagado:true
                });
        }catch(e){
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
              });
        }
      },

      async login(req, res){
        try{
            const {email, password} = req.body;
            if(!email || !password){
                return res.status(400).json({
                    errors:['Faltando Email Ou Password']
                })
            }
            
            const Tags = await Tags.findOne({where:{email}});
            if(!Tags){
              return res.status(400).json({
                errors:[' Email Ou Password Incorrecto!']
            })
            }
            const isMatch = await bcrypt.compare(password, Tags.password);
            if (!isMatch) {
                return res.status(400).json({
                    errors: ['Email Ou Password Incorrecto!']
                });
            }
            const token =jwt.sign({id: Tags.id}, process.env.TOKENSECRET,{
              expiresIn:"1d",
              
            });
            

            return res.json({Tags, token});

        } catch(e){
            return res.status(400).json({
                errors:[e.Message]
            })
        }
      }, 
};
