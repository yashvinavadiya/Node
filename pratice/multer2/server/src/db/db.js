import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config({
  path:'../.env'
})

const connectDB = async() => {
  try{
    mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDb Connected!!!');
    
  }catch(err){
    console.error('❌ MongoDb Error' , err)
    process.exit(1)
  }
}

export default connectDB