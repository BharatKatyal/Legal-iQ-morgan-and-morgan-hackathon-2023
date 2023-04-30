import express from 'express';
import fs from 'fs';
import path from 'path'

import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '../utils/pinecone-client.js';
import { CustomPDFLoader, CustomDocXLoader } from '../utils/customLoaders.js';
import { PINECONE_INDEX_NAME } from '../configs/pinecone.js';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';

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

router.post('/:namespace', async (req, res) => {
    const filePath = `./docs/${req.params.namespace}`;
    try {
        /*load raw docs from the all files in the directory */
        const directoryLoader = new DirectoryLoader(filePath, {
          '.pdf': (path) => new CustomPDFLoader(path),
          '.docx': (path) => new CustomDocXLoader(path)
        });
    
        // const loader = new PDFLoader(filePath);
        const rawDocs = await directoryLoader.load();
    
        /* Split text into chunks */
        const textSplitter = new RecursiveCharacterTextSplitter({
          chunkSize: 1000,
          chunkOverlap: 200,
        });
    
        const docs = await textSplitter.splitDocuments(rawDocs);
        console.log('split docs', docs);
    
        console.log('creating vector store...');
        /*create and store the embeddings in the vectorStore*/
        const embeddings = new OpenAIEmbeddings();
        const index = pinecone.Index(PINECONE_INDEX_NAME); //change to your own index name
    
        //embed the PDF documents
        await PineconeStore.fromDocuments(docs, embeddings, {
          pineconeIndex: index,
          namespace: req.params.namespace,
          textKey: 'text',
        });

        return res.status(200).json({ message: "Successfully uploaded files to database!" });

    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ error: error });
    }
})

export default router;
