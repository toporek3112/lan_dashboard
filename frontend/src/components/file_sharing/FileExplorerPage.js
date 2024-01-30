import React, { useState, useEffect } from 'react';
import FileUploadBox from './FileUploadBox';
import Sidebar from './Sidebar';
import FileExplorer from './FileExplorer';

const FileExplorerPage = () => {
  // to be used for upload logic
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  const [currentPath, setCurrentPath] = useState('nfs')
  const [selectedFolder, setSelectedFolder] = useState({path: "./"});
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  
  // const [folderContents, setFolderContents] = useState([]); // Dummy contents

  useEffect(() => {
    const fetchFolderContents = async () => {
      try {
        const encodedFolderPath = encodeURIComponent(selectedFolder.path);
        const response = await fetch(`http://IP_ADDRESS:3002/getFolderContents/${encodedFolderPath}`);
        
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
  }, [selectedFolder]);

  const onFolderSelect = (folder) => {
    setSelectedFolder(folder)
    setCurrentPath(`nfs/${folder.path}`)
  }

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
      const response = await fetch('http://IP_ADDRESS:3002/upload', {
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
    // <div className='App-content'>
    //   <FileUploadBox
    //     selectedFiles={selectedFiles}
    //     onFileSelect={handleFileSelect}
    //     onUpload={handleUpload} />
    // </div>

    <div className="file-explorer-container">
      <Sidebar folders={folders} onFolderSelect={onFolderSelect} />
      <FileExplorer files={files} currentPath={currentPath} />
    </div>
  );
};

export default FileExplorerPage;

