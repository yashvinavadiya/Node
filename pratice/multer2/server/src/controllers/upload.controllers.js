export const uploadFile = (req , res) => {
  if(!req.file){
    return res.status(400).json({message:"No File Uploded!!"})
  }
  res.json({
    message:"File Upload Successfully",
    file:req.file
  })
}