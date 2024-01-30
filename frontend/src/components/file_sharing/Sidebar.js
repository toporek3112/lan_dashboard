import React from 'react';
import Folder from './Folder'

function Sidebar({ folders, onFolderSelect }) {
  return (
    <div className="sidebar rgb-1">
      {folders.map(folder => (
        <Folder key={folder.name} folder={folder} onFolderSelect={onFolderSelect} />
      ))}
    </div>
  );
}

export default Sidebar;
