import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from "cors"
import userRouter from './routes/usersRoutes.js'
import { errorHandler } from './middlewares/errorMiddlewares.js'
import blogRouter from './routes/blogRoutes.js'
errorHandler
errorHandler
const app = express()

app.use(cors())
app.use(express.json())

app.use('/v1', userRouter)
app.use('/v1', blogRouter)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
mongoose.connect(process.env.CONNECTION_URI).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server listening on port ${PORT}`);
        
    })
})
