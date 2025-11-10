import mongoose from 'mongoose'

const FileSchema =  new mongoose.Schema({
  originalName:{type:String , required:true},
  url:{type:String , required:true},
  public_id:{type:String , required:true},
  format:String,
  size:Number,
  uplodedBy:{type:String}
},  {timestamps:true})

export default FileModel = mongoose.model('File' , FileSchema)