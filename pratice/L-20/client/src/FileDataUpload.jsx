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
      setMessage("👉Please Select a File");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:6050/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);

      setMessage(res.data.message);
      setUploadFile(res.data.file);
    } catch (err) {
      setMessage("upload failed!!");
    }
  };

  return (
    <>
      <div className="h-screen bg-gray-400">
        <div>
          <form onSubmit={onSubmit} className="bg-gray-500 p-6" method="POST">
            <input
              type="file"
              id=""
              onChange={onFileChange}
              className="bg-white p-2 rounded-xl"
            />
            <button className="btn ms-4" type="submit">
              Upload
            </button>
          </form>

          <p className="bg-purple-800 text-white">{message}</p>

          {uploadFile && (
            <>
              <h2>✅Uploded File</h2>
              <p>{uploadFile.originalname}</p>
              <img
                src={`http://localhost:6050/uploads/${uploadFile.filename}`}
                alt="multer"
                width="200"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FileDataUpload;
