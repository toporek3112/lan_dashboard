import React, { useState, useRef } from 'react';
import File from './File';

function FileExplorer({ files, currentPath, onUploadSuccess }) {
  const fileInputRef = useRef(null);

  const handleFilesSelected = (event) => {
    const newFiles = Array.from(event.target.files).map(file => ({
      fileObject: file,
      name: file.name,
      type: 'file',
      path: `${currentPath}/${file.name}`,
      status: 'uploading' // Initial status
    }));

    newFiles.forEach(file => handleUpload(file));
  };

  const handleUpload = async (file) => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    // Inizialize new FormData object and append the file to it
    const formData = new FormData();
    formData.append('file', file.fileObject);

    try {
      const response = await fetch(`http://192.168.178.140:3002/upload?path=${encodeURIComponent(currentPath)}`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        onUploadSuccess();
        alert('File Upload: Successfull :)');
      }
      else {
        alert('File Upload: Failed :(');
      }

    } catch (error) {
        alert(error);
    }
  };

  return (
    <div className="file-explorer rgb-white">
      <h2 className='current-path'>{currentPath}</h2>
      <div className='files-wrapper'>
        {/* Invisible file input */}
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFilesSelected}
          style={{ display: 'none' }}
        />
        {/* Clickable wrapper for file input */}
        <div 
          className='file-wrapper' 
          style={{ fontSize: '30px' }} 
          onClick={() => fileInputRef.current.click()}
          title='Add File'
        >
          <p>+</p>
        </div>
        {files.map((file, index) => (
          <File key={file.name} file={file} />
        ))}
      </div>
    </div>
  );
}

export default FileExplorer;
