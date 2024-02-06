import React, { useRef } from 'react';
import File from './File';
import { uploadFile } from './ffetch';

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

    await uploadFile(file, currentPath, onUploadSuccess)
  };

  return (
    <div className={'file-explorer rgb-white'}>
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
