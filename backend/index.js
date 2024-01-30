const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const logger = require('./logger');
const app = express();
const PORT = 3002;

/////////////
/// SETUP ///
/////////////

// Detailed CORS configuration
// const corsOptions = {
//   origin: 'http://localhost:3001', // Replace with the URL of your React app
//   methods: 'POST', // Allow only POST requests
//   optionsSuccessStatus: 200 // For legacy browser support
// };

// Enable CORS for all routes
app.use(cors());

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/srv//nfs/uploads'); // Change this to your desired upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  }
});

const upload = multer({ storage: storage });



//////////////////
/// ENDPOINTS ///
//////////////////

app.get('/getFolderContents/:folderName?', async (req, res) => {
  const folderName = req.params.folderName == undefined ? '' : req.params.folderName;
  const folderPath = path.join('/srv/', folderName); // Adjust the base path as necessary
  logger.info(`Folder Contents request for path ${folderPath}`);

  try {
    const fileNames = await fs.readdir(folderPath);
    const filesWithTypes = await Promise.all(fileNames.map(async fileName => {
      const filePath = path.join(folderPath, fileName);
      const stats = await fs.lstat(filePath);
      return {
        name: fileName,
        type: stats.isDirectory() ? 'directory' : 'file',
        path: path.join(folderName, fileName) // Relative path from the base folder
      };
    }));
    return res.json(filesWithTypes);
  } catch (error) {
    logger.error(`Error reading folder ${folderPath}: ${error}`);
    return res.status(500).send('Error reading folder contents.');
  }
});

// Upload endpoint
app.post('/upload', upload.array('files'), (req, res) => {
  if (!req.files) {
    logger.error('No files were uploaded.');
    return res.status(400).send('No files were uploaded.');
  }
  logger.info(`Uploaded ${req.files.length} files.`);
  return res.status(200).send('Files uploaded successfully.');
});

// Standart page
app.get('/', (req, res) => {
  logger.info(`rootpath (/) request ${res}`);
  return res.status(200).send('Hello to my backend')
})

app.listen(PORT, () => {
  logger.info(`Server is running on PORT ${PORT}`);
});
