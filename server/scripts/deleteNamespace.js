import { pinecone } from '../utils/pinecone-client.js';

const index = pinecone.Index("langchain2");
await index.delete1({
    deleteAll: true,
    namespace: "pdf-test-namespace4",
}).then(console.log("Finished!"));
