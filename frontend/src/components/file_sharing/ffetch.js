
const url = process.env.REACT_APP_BACKEND_URL

export const fetchFolderContents = async (folderPath, setFolders, setFiles) => {
  try {
    const encodedFolderPath = encodeURIComponent(folderPath);
    const response = await fetch(`${url}/getFolderContents/${encodedFolderPath}`);

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

export const uploadFile = async (file, currentPath, onUploadSuccess) => {
  // Inizialize new FormData object and append the file to it
  const formData = new FormData();
  formData.append('file', file.fileObject);

  try {
    const response = await fetch(`${url}/upload?path=${encodeURIComponent(currentPath)}`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      onUploadSuccess();
      alert('File Upload: Successfull :)');
    }
    else {
      alert('File Upload: Failed :(');
    }

  } catch (error) {
    alert(error);
  }
}

export const downloadFile = async (file) => {
  const response = await fetch(`${url}/download?filePath=${encodeURIComponent(file.path)}`);
  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  } else {
    // Handle error
    console.error('Error downloading file.');
  }
}
