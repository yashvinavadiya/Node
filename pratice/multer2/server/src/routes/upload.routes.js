import { uploadFile } from "../controllers/upload.controllers.js";
import express from 'express'
import multer from "multer";
import path from 'path'

const router = express.Router()

// config

const storage = multer.diskStorage({
  destination:(req , file , cb) => cb(null , 'uploads/'),
  filename:(req , file , cb) => cb(null , Date.now() + path.extname(file.originalname))
})

const fileFilter = (req , file , cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)
  if(extname && mimetype){
    cb(null , true)
  }else{
    cb(new Error("Only images and PDF files are Allowed."))
  }
} 

const upload = multer({
  storage:storage,
  limits:{fileSize:2*1024*1024}, // 2MB
  fileFilter:fileFilter
})

router.post("/" , upload.single("file") , uploadFile)

export default router