import FileModels from "../models/File.models.js";

export const uploadFile = async(req , res) => {
  try{
    if(!req.file) return res.status(400).json({message:"File Not Uploded!!"})
      const {originalname}  = req.file.originalname ? req.file : {originalname:req.file.originalname}
    const fileDoc = await FileModels.create({
      originalName:req.file.originalname,
      url:req.file.path,
      public_id:req.file.filename,
      format:req.file.format,
      size:red.file.size
    })

    return res.json({
      message:'File Uploaded Successfully (cloudinary)',
      file:{
        id:fileDoc._id,
        originalName:fileDoc.originalName,
        url:fileDoc.url,
        public_id:fileDoc.public_id,
        format:fileDoc.format,
        size:fileDoc.size
      }
    })
  }catch{
    console.error(err)
    return res.status(500).json({message:'Server Error' , error:err.message})
  }
}