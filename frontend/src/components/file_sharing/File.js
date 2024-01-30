import React from 'react';
import icon from '../../img/icon_file.png';
import '../../css/FileUploadPage.css'

const File = ({ file }) => {
  // Function to crop filename if it's too long
  const croppedFileName = (name) => {
    const maxChar = 15; // Maximum characters to display
    const len = name.length
    return name.length > maxChar ? name.substring(0, maxChar) + '...' + name.substring(len-8, len) : name;
  };

  return (
    <div className="file-wrapper" key={file.name} title={file.name}>
      <img src={icon} alt="PDF icon" className="file-icon" />
      <p className="file-name">
        {croppedFileName(file.name)}
      </p>
    </div>
  );
};

export default File;
