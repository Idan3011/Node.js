import 'dotenv/config'
import express from 'express'
import { errorHandler } from './middlewares/errorMiddleware.js'
import cors from 'cors';
import movieRoutes from './routes/movieRoutes.js'
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1/movies', movieRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`SERVER is running on port ${PORT}`);
    
})
