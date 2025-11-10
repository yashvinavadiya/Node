import FileModels from '../models/File.models.js';

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    console.log('File Info:', req.file);

    const fileDoc = await FileModels.create({
      originalName: req.file.originalname,
      url: req.file.path,      
      public_id: req.file.filename,  
      format: req.file.format || req.file.mimetype,
      size: req.file.size
    });

    res.json({
      message: 'File uploaded successfully',
      file: {
        id: fileDoc._id,
        originalName: fileDoc.originalName,
        url: fileDoc.url,
        public_id: fileDoc.public_id,
        format: fileDoc.format,
        size: fileDoc.size
      }
    });

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
