import dotenv from "dotenv";
import { log } from "console";
import app from "./app";

dotenv.config();

const port: number = Number.parseInt(process.env.PORT!) || 8000;

(async () => {
  try {
    app.listen(port, () => {
      if (process.env.NODE_ENV === "development") {
        log(`Server is running on http://localhost:${port}`);
      } else {
        log(`Server is running...`);
      }
    });
  } catch (error: any) {
    log(`Error: ${error.message}`);
  }
})();
