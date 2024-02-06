import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FileUploadBox from './FileUploadBox';
import Sidebar from './Sidebar';
import FileExplorer from './FileExplorer';
import { fetchFolderContents } from './ffetch';

const FileExplorerPage = () => {
  // Navigation / React Router
  const navigate = useNavigate();
  const { folderPath } = useParams();

  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploadCount, setUploadCount] = useState(0);

  // const [folderContents, setFolderContents] = useState([]); // Dummy contents
  useEffect(() => {
    fetchFolderContents(folderPath, setFolders, setFiles);
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

