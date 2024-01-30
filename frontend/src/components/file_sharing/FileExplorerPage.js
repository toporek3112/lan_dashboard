import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FileUploadBox from './FileUploadBox';
import Sidebar from './Sidebar';
import FileExplorer from './FileExplorer';

const FileExplorerPage = () => {
  const navigate = useNavigate();
  const { folderPath } = useParams();
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  // to be used for upload logic
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  // const [folderContents, setFolderContents] = useState([]); // Dummy contents
  console.log(folderPath);
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
  }, [folderPath]);

  const onFolderSelect = (folder) => {
    const newPath = `${folderPath}/${folder.name}`
    const encodedPath = encodeURIComponent(newPath);
    navigate(`/folder/${encodedPath}`);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files', file); // 'files' is the key that the server will read from
    });

    console.log(formData);

    try {
      const response = await fetch('http://192.168.178.140:3002/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Files uploaded successfully');
      } else {
        console.error('Upload failed:', response);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="file-explorer-container rgb-1">
      <Sidebar folders={folders} onFolderSelect={onFolderSelect} />
      <FileExplorer files={files} currentPath={folderPath} />
    </div>
  );
};

export default FileExplorerPage;

