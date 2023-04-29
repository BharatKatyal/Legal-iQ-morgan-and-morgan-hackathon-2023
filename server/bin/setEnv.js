import path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";

const setEnv = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    dotenv.config({ path: path.join(__dirname, "..", ".env") });
};

export default setEnv;
