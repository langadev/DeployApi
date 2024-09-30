import jwt from 'jsonwebtoken';
require('dotenv').config();

module.exports={
    async auth(req, res,next){
        const headers = req.headers.authorization;
        if(!headers){
            return res.status(400).json({
                error:"Necessario Realizar Login"
            })
        }
        const [,token] = headers.split(' ');
        if(!token){
            return res.status(400).json({
                error:"Necessario realizar o Login"
            })
        }
        try {
            const decode = jwt.verify(token,process.env.TOKENSECRET )
            req.userId = decode.id
            next();
        } catch (error) {
            return res.status(400).json({
                erro:true,
                Messagem:"Necessario Realizar o login/ Token Invalido"
            })
        }
    }
}