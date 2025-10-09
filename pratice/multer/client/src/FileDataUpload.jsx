import { useState } from "react";
import axios from "axios";

const FileDataUpload = () => {
  
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadFile, setUploadFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please Select a File");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5040/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res.data.message);
      setUploadFile(res.data.file || { url: res.data.url });
    } catch (err) {
      setMessage("upload failed!!");
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} >
        <input type="file" name="file" id="" onChange={onFileChange} />
        <button type="submit">Upload</button>
      </form>

      <p>{message}</p>


      {
        uploadFile && uploadFile.url && (
          <>
            <h2>Uploded File</h2>
            <p>{uploadFile.originalname}</p>
            <img src={`http://localhost:5040/${uploadFile.filename}`} alt="multer" width="200" />
          </>
        )
      }
      {
         uploadFile && uploadFile.url &&(
          <>
             <h2>Uploded File</h2>
             <img src={uploadFile.url} alt="multer" width="200" />
          </>
         )
      }
    </>
  );
};


export default FileDataUpload