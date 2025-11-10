import express, { Router } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import uploadRoutes from './src/routes/upload.routes.js'
import connectDB from './src/db/database.db.js'
import { uploadFile } from './src/controllers/upload.controllers.js';
import router from './src/routes/upload.routes.js';

dotenv.config({
  path:'./.env'
});

const app = express()

const PORT = process.env.PORT || 4000

app.use(cors({
  origin:process.env.FRONTEND_URL || '*'
}))

app.use(express.json())

connectDB();

app.use('/upload' , router)

app.get('/' , (req , res) => res.send('Backend Complete'))

app.listen(PORT , () => {
  console.log(`Server running on port ${PORT}`);
})