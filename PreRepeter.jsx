
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Button } from "@/components/ui/button";

export default function PreRepeter() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
  }, []);

  const uploadFiles = async () => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file);
    });

    try {
      const res = await axios.post("http://localhost:8000/upload", formData);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="p-4">
      <div {...getRootProps()} className="border-dashed border-2 border-gray-500 p-4 cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag & drop PDFs here, or click to select</p>
      </div>
      <ul>
        {files.map(file => (
          <li key={file.path}>{file.path}</li>
        ))}
      </ul>
      <Button onClick={uploadFiles}>Upload</Button>
    </div>
  );
}
