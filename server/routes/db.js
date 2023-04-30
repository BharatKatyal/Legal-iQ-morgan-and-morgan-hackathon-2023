import express from 'express';
import fs from 'fs';
import path from 'path'

const router = express.Router();

// Define route to handle file uploads
router.get('/', async (req, res) => {
    const dirPath = './docs'; // Replace with your directory path

    // Use fs.readdir to retrieve all files and directories in the specified path
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while retrieving directories.' });
        return;
      }
  
      // Use path.join to get the full path of each file/directory, then use fs.stat to check if it's a directory
      const dirNames = files.filter((file) => {
        const filePath = path.join(dirPath, file);
        return fs.statSync(filePath).isDirectory();
      });
  
      const dirNamesObject = [];

      for (let file of dirNames) {
        dirNamesObject.push({ title: file });
      }

      res.json(dirNamesObject);
    });
});



export default router;
