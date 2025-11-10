import express from 'express'
import multer from 'multer'
import { uploadFile } from '../controllers/upload.controllers.js'
import {CloudnaryStorage} from 'multer-storage-cloudinary'
import {v2 as cloudinary} from 'cloudinary'

const router = express.Router()

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key : process.env.CLOUDINARY_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

