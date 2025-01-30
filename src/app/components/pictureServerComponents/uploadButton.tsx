"use client";

import { useState } from "react";

export default function ImageUploaderButton({ uploadImage, setUploadedFileName }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    const response = await uploadImage(formData);
    if (response.success) {
      setUploadedFileName(response.data.filename); // Update parent state
      alert(`Image uploaded successfully! Filename: ${response.data.filename}`);
    } else {
      alert("Image upload failed.");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <input type="file" onChange={handleFileChange} />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
}
