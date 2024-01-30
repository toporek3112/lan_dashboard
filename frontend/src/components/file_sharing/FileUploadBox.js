import React from 'react';
import File from './File'
import '../../css/FileUploadPage.css'

const FileUploadBox = ({ selectedFiles, onFileSelect, onUpload }) => {
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior to allow for a drop event
    console.log(e);
  };

  const handleDrop = (e) => {
    e.preventDefault(); // Prevent the default behavior (open as link for some elements)
    
    const files = e.dataTransfer.files; // Get the files from the event
    if (files && files.length > 0) {
      onFileSelect(files[0]); // If multiple files are allowed, you can pass the whole FileList
      e.dataTransfer.clearData(); // Clear the drag data cache (for all formats/types)
    }
  };

  return (
    <div className='file-upload-wraper'>
      <div>
        <div 
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input').click()}
          className='file-upload-field'
        >
          {selectedFiles.length > 0 ? (
            selectedFiles.map((file, index) => <File key={index} file={file} />)
          ) : (
            <p>Drag and drop or click to select</p>
          )}
        </div>
        <input
          id="file-input"
          type="file"
          multiple
          onChange={(e) => onFileSelect(e.target.files)}
          style={{ display: 'none' }}
        />
        <button 
          onClick={() => onUpload()} 
          className='file-upload-button'
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default FileUploadBox;
