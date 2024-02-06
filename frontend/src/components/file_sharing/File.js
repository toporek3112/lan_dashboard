import React from 'react';
import icon from '../../img/icon_file.png';
import { downloadFile } from './ffetch';
import '../../css/FileUploadPage.css'

const File = ({ file }) => {
  // Function to crop filename if it's too long
  const croppedFileName = (name) => {
    const maxChar = 12; // Maximum characters to display
    const len = name.length;
    return len > maxChar ? name.substring(0, maxChar) + '...' + name.substring(len-8, len) : name;
  };

  const handleDownload = async () => {
    downloadFile(file)
  };

  return (
    <div className="file-wrapper" title={file.name} onClick={handleDownload}>
      {file.status === 'uploading' && <p>Uploading...</p>}
      {file.status === 'success' && (
        <>
          <img src={icon} alt="File icon" className="file-icon" />
          <p className="file-name">
            {croppedFileName(file.name)}
          </p>
        </>
      )}
      {file.status === 'error' && <p>Error in uploading file</p>}
    </div>
  );
};

export default File;
