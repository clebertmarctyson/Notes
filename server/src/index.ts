import dotenv from "dotenv";
import { log } from "console";
import app from "./app";

dotenv.config();

const port: number = Number.parseInt(process.env.PORT!) || 8000;

(async () => {
  try {
    app.listen(port, () => {
      log(`Server is running on http://localhost:${port}`);
    });
  } catch (error: any) {
    log(`Error: ${error.message}`);
  }
})();
