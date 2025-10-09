import express from 'express'
import router from './src/routes/upload.routes.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config({
  path:'./.env'
})

const app = express()

app.use(express.json())

app.use("/upload" , router)

app.use(cors())

app.listen(process.env.PORT , (err) => {
  console.log(`Multer Project Started....${process.env.PORT}`);
})