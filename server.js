import Express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = Express()
import userRoutes from './src/routes/userRoutes'
import postRoutes from './src/routes/postRoutes'
import tagRoutes from './src/routes/tagRoutes'
const port = process.env.SERVER

app.use(Express.urlencoded({extended:true}));
app.use(Express.json());
app.use(cors())
app.use('/user',userRoutes)
app.use('/post',postRoutes)
app.use('/tag',tagRoutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});





