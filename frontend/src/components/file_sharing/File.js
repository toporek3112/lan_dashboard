import React from 'react';
import icon from '../../img/icon_file.png';
import '../../css/FileUploadPage.css'

const File = ({ file }) => {
  // Function to crop filename if it's too long
  const croppedFileName = (name) => {
    const maxChar = 12; // Maximum characters to display
    const len = name.length;
    return len > maxChar ? name.substring(0, maxChar) + '...' + name.substring(len-8, len) : name;
  };

  const handleDownload = async () => {
    const response = await fetch(`http://192.168.178.140:3002/download?filePath=${encodeURIComponent(file.path)}`);
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } else {
      // Handle error
      console.error('Error downloading file.');
    }
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
