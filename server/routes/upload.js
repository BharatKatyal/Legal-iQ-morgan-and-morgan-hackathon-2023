import express from 'express';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const caseName = req.params.caseName;
        const dir = `./docs/${caseName}`;
        // create new directory if it doesn't exist
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Initiate multer upload with storage engine
const upload = multer({ storage });

// Define route to handle file uploads
router.post('/:caseName', upload.array('files'), (req, res) => {
    res.status(200).json({ message: 'Files uploaded successfully!', directoryName: req.params.caseName });
});

export default router;
