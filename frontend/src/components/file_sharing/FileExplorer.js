import React from 'react';
import File from './File';

function FileExplorer({ files, currentPath }) {
  // console.log(files[0].name)
  return (
    <div className="file-explorer rgb-white" key='folderContents'>
      <h2 className='current-path'>{currentPath}</h2>
      <div className='files-wrapper'>
        {files.map(file => (
          <File file={file} />
        ))}
      </div>
    </div>
  );
}

export default FileExplorer;
