import express from 'express';
import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { uploadFile } from '../controllers/upload.controllers.js';

const router = express.Router();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resourceType = 'image';
    if (file.mimetype === 'application/pdf') resourceType = 'raw';
    return {
      folder: 'rnw_uploads',
      resource_type: resourceType,
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf']
    };
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|pdf/;
    if (allowed.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only images and PDFs allowed'));
  }
});

router.post('/', upload.single('file'), uploadFile);

export default router;
