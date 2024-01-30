import React from 'react';
import { ReactComponent as FolderIcon } from '../../img/icon-folder.svg';
import '../../css/FileUploadPage.css';

const File = ({ folder, onFolderSelect }) => {

  // Function to crop filename if it's too long
  const croppedFileName = (name) => {
    const maxChar = 10; // Maximum characters to display
    return name.length > maxChar ? name.substring(0, maxChar) + '...' : name;
  };

  return (
    <div className="folder-wrapper" title={folder.name} onClick={() => onFolderSelect(folder)}>
      <FolderIcon className="folder-icon"/>
      <p className="folder-name">
        {croppedFileName(folder.name)}
      </p>
    </div>
  );
};

export default File;
