import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as FolderIcon } from '../../img/icon-folder.svg';
import '../../css/HomePage.css'

const HomePage = () => {
  const navigate = useNavigate();

  const goToFileExplorer = () => {
    navigate('/file-explorer/folder/nfs'); // Update the path as per your routing setup
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '93vh' }}>
      <button className='go-to-service-buttons rgb-1' onClick={goToFileExplorer}>
        <FolderIcon className="go-to-service-buttons-folder"/>
      </button>
    </div>
  );
};

export default HomePage;
