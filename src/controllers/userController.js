const Model = require('../models');
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

require('dotenv').config()
const User = Model.User;

module.exports = {
    async index(req, res){
        const users = await User.findAll()
        return res.json(users);
    },
    
      
    async store(req, res) {
        try {
           
            const { name, email, profile_pic } = req.body;
            const hashedPassword = await bcrypt.hash(req.body.password,10);
            // Validate input data
            const password = hashedPassword;
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Dados incompletos' });
            }

            // Create a new user
            const newUser = { name, email, profile_pic,password, role_id:1 };
            const user = await User.create(newUser);

            // Respond with the created user
            return res.status(201).json({ user })

        } catch (error) {
            // Log the error for debugging
            console.error('Error creating user:', error);

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
            const user = await User.findByPk(id,{
              attributes:['name','email', 'profile_pic'],
              include:[Foto]
             
            })
            if(!user){
                return res.status(400).json({
                    errors:['Usuario nao existe']
                })
            }
            return res.status(200).json(user);

        }catch(e){
            return res.status(400).json({
                errors: e.message
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
            const user = await User.findByPk(id);
            if(!user){
                return res.status(400).json({
                    errors:['Usuario nao existe']
                })
            }
            const updatedUser = await user.update(req.body);
            return res.json(updatedUser);
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
            const user = await User.findByPk(id);
            if(!user)
                {
                    return res.status(400).json({
                        errors:['Usuario nao existe']
                    });
                }
                await user.destroy();
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

            const user = await User.findOne({where:{email}});
            if(!user){
              return res.status(400).json({
                errors:[' Email Ou Password Incorrecto!']
            })
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    errors: ['Email Ou Password Incorrecto!']
                });
            }
            const token =jwt.sign({id: user.id}, process.env.TOKENSECRET,{
              expiresIn:"1d",
              
            });
            

            return res.status(200).json({user, token});

        } catch(e){
            return res.status(400).json({
                errors:[e.Message]
            })
        }
      },
      async signout  (req, res) {
      return  res.clearCookie('token').status(200).json('Signout success!');
      }, 
};
