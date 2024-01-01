import 'dotenv/config'
import { errorHandler } from './middlewares/errorMiddleware.js'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/usersRoutes.js'
const app = express()

app.use(express.json());

app.use(cors())
app.use('/api/v1/users', userRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server is runnig on port ${PORT}`);
    
})