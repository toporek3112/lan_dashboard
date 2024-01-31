import React from 'react';
import Folder from './Folder'
import { useNavigate  } from 'react-router-dom';

function Sidebar({ folders, onFolderSelect }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="sidebar rgb-1">
       <div className='go-back-button sidebar-button' title='Go Back' onClick={goBack}>
        <p style={{ marginLeft: '10px', fontSize: '25px'}}>&lt;</p>
      </div>
      {folders.map(folder => (
        <Folder key={folder.name} folder={folder} onFolderSelect={onFolderSelect} />
      ))}
      <div className='add-folder-button sidebar-button' title='Add Folder'>
        <p>+</p>
      </div>
    </div>
  );
}

export default Sidebar;
