import express from "express";
import cors from "cors";

import indexRouter from './routes/index.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", indexRouter);

app.get('/', (req, res) => {
    res.send("Hello, world!");
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});
