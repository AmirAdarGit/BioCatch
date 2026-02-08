import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("  GET  /health");
  console.log("  GET  /api/requestLog");
  console.log("  POST /api/init");
  console.log("  POST /api/getScore");
});
