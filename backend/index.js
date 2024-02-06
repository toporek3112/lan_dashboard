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

// Configure Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // You can determine the destination dynamically
    const destPath = path.join('/srv/', req.query.path);
    cb(null, destPath);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');



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
        path: path.join(folderName, fileName), // Relative path from the base folder
        status: 'success'
      };
    }));
    return res.json(filesWithTypes);
  } catch (error) {
    logger.error(`Error reading folder ${folderPath}: ${error}`);
    return res.status(500).send('Error reading folder contents.');
  }
});

// Now, handle the files
app.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(500).json(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).json(err);
    }

    // Everything went fine.
    logger.info(`File uploaded to ${req.body.path}`);
    res.status(200).send('File uploaded successfully');
  });
});

// Download
app.get('/download', (req, res) => {
  let filePath = req.query.filePath;
  // Basic sanitization to remove potentially malicious path segments
  filePath = filePath.replace(/(\.\.\/?)/g, '');
  
  const absolutePath = path.join('/srv/', filePath);
  logger.info(`File download request: ${absolutePath}`);

  res.download(absolutePath, (err) => {
    if (err) {
      // Handle error, but don't expose internal error to client
      res.status(500).send("Error occurred while downloading");
    }
  });
});


// Standart page
app.get('/', (req, res) => {
  logger.info(`rootpath (/) request ${res}`);
  return res.status(200).send('Hello to my backend')
})

app.listen(PORT, () => {
  logger.info(`Server is running on PORT ${PORT}`);
});
