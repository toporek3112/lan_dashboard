import React, { useState, useRef } from 'react';
import File from './File';

function FileExplorer({ files, currentPath }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);

  const fileInputRef = useRef(null);

  const handleFilesSelected = (event) => {
    const newFiles = Array.from(event.target.files).map(file => ({
      fileObject: file,
      name: file.name,
      type: 'file',
      path: `${currentPath}/${file.name}`,
      status: 'uploading' // Initial status
    }));

    setUploadFiles(newFiles);
    newFiles.forEach(file => handleUpload(file));
  };

  const handleUpload = async (file) => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file.fileObject);

    // console.log(`Uploading ${file.name} to ${currentPath}`)
    console.log(formData);

    try {
      const response = await fetch(`http://192.168.178.140:3002/upload?path=${encodeURIComponent(currentPath)}`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        // Update the status to 'success'
        file.status = 'success'
        // updateFileStatus(file.file, 'success');
      } else {
        // Update the status to 'error'
        file.status = 'error'
        // updateFileStatus(file.file, 'error');
      }
    } catch (error) {
        file.status = 'error'
        // updateFileStatus(file.file, 'error');
    }
  };

  // const updateFileStatus = (file, status) => {
  //   setUploadFiles(prev => prev.map(f => 
  //     f.file === file ? { ...f, status: status } : f
  //   ));
  
  //   if (status === 'error') {
  //     // Remove the file from the list after 3 seconds if there's an error
  //     setTimeout(() => {
  //       setUploadFiles(prev => prev.filter(f => f.file !== file));
  //     }, 3000);
  //   }
  // };

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
        <div className='file-wrapper' style={{ fontSize: '30px' }} onClick={() => fileInputRef.current.click()}>
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
