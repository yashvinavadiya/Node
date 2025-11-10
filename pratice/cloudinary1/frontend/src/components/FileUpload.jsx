import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploaded, setUploaded] = useState(null);
  const apiBase = 'http://localhost:5000';

  const onChange = e => setFile(e.target.files[0]);

  const onSubmit = async e => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      setMessage('Uploading...');
      const res = await axios.post(`${apiBase}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setUploaded(res.data.file);
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h2>Upload File to Cloudinary</h2>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onChange} />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>

      {uploaded && (
        <div style={{ marginTop: 20 }}>
          <h3>Uploaded File:</h3>
          <p>{uploaded.originalName}</p>
          {uploaded.format?.includes('image') ? (
            <img src={uploaded.url} alt="" style={{ width: 200, borderRadius: 8 }} />
          ) : (
            <a href={uploaded.url} target="_blank" rel="noreferrer">
              View PDF
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
