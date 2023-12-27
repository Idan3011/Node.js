import path from "path";
import { fileURLToPath } from "url";
import express from "express";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const pathDirectory = path.join(__dirname, "../public");

app.use(express.static(pathDirectory))



app.post("/weather", (req, res) => {
    res.appendHeader('Access-Control-Allow-Origin', 'http://localhost:5173')

  res.send({
    forecast: "it is sunny",
    location: "Tel-Aviv, israel",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
