import mongoose from "mongoose";

const connectDB = async() => {
  try{
    const db = await mongoose.connect(process.env.MONGODB_URI)
    console.log('Database Connected!!!' , db.connection.host);
  }catch(err){
    console.log('Mongodb connection error' , err);
    process.exit(1)
  }
}

export default connectDB