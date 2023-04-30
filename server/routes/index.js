import { Router } from "express";
import chatRouter from "./chat.js";
import uploadRouter from './upload.js';
import dbRouter from './db.js';

const router = Router();

router.use("/chat", chatRouter);
router.use("/upload", uploadRouter);
router.use("/db", dbRouter);

export default router;
