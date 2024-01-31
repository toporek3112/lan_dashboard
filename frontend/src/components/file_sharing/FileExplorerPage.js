import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FileUploadBox from './FileUploadBox';
import Sidebar from './Sidebar';
import FileExplorer from './FileExplorer';

const FileExplorerPage = () => {
  // Navigation / React Router
  const navigate = useNavigate();
  const { folderPath } = useParams();

  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploadCount, setUploadCount] = useState(0);

  // const [folderContents, setFolderContents] = useState([]); // Dummy contents
  useEffect(() => {
    const fetchFolderContents = async () => {
      try {
        const encodedFolderPath = encodeURIComponent(folderPath);
        const response = await fetch(`http://192.168.178.140:3002/getFolderContents/${encodedFolderPath}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const contents = await response.json();
        
        // seperate folders and files
        const folders = contents.filter(content => content.type === 'directory');
        const files = contents.filter(content => content.type === 'file');
        console.log(contents);
        setFolders(folders);
        setFiles(files);
      } catch (error) {
        console.error('Error fetching folder contents:', error);
      }
    };
  
    fetchFolderContents();
  }, [folderPath, uploadCount]);

  const onFolderSelect = (folder) => {
    const newPath = `${folderPath}/${folder.name}`
    const encodedPath = encodeURIComponent(newPath);
    navigate(`/file-explorer/folder/${encodedPath}`);
  };

  const onUploadSuccess = () => {
    setUploadCount(uploadCount => uploadCount + 1)
  }

  return (
    <div className="file-explorer-container rgb-1">
      <Sidebar folders={folders} onFolderSelect={onFolderSelect} />
      <FileExplorer files={files} currentPath={folderPath} onUploadSuccess={onUploadSuccess} />
    </div>
  );
};

export default FileExplorerPage;

