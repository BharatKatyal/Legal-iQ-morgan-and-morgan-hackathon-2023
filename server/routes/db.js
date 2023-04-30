import express from 'express';
import { pinecone } from '../utils/pinecone-client.js';

const router = express.Router();

// Define route to handle file uploads
router.get('/', async (req, res) => {
    const index = pinecone.Index("langchain2");
    const namespaces = await index.listNameSpaces();

    res.status(200).json(namespaces);
});

export default router;
