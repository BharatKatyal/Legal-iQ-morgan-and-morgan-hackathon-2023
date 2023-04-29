import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { makeChain } from '../utils/makeChain.js';
import { pinecone } from '../utils/pinecone-client.js';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '../configs/pinecone.js';
import express from 'express';

const router = express.Router();

router.post("/", async (req, res) => {
  const { question, history } = req.body;

  console.log('question', question);

  if (!question) {
    return res.status(400).json({ message: 'No question in the request' });
  }
  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

  try {
    const index = pinecone.Index(PINECONE_INDEX_NAME);

    /* create vectorstore*/
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({}),
      {
        pineconeIndex: index,
        textKey: 'text',
        namespace: PINECONE_NAME_SPACE, //namespace comes from your config folder
      },
    );

    //create chain
    const chain = makeChain(vectorStore);
    //Ask a question using chat history
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: history || [],
    });

    console.log('response', response);
    res.status(200).json(response);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
});

export default router;
