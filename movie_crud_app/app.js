import express from "express";
import path, { parse } from "path";
import { promises as fs } from "node:fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathDirectory = path.join(__dirname, "./movies.json");

const app = express();

app.use(express.json());
app.get("", (req, res) => {
  res.send("this is port 3030.");
});

app.get("/movies", async (req, res) => {
  res.appendHeader("Access-Control-Allow-Origin", "http://localhost:5174");
  try {
    const data = await fs.readFile(pathDirectory, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading movies.json:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

app.get("/searchMovie/:title", async (req, res) => {
  try {
    const searchTitle = req.params.title;
    console.log("Search Title:", searchTitle);
    const data = await fs.readFile(pathDirectory, "utf8");
    const movies = JSON.parse(data);

    const foundMovie = movies.find(
      (movie) => movie.Title.toLowerCase() === searchTitle.toLowerCase()
    );
    if (foundMovie) {
      res.json(foundMovie);
    } else {
      res.status(404).send(`Movie with title "${searchTitle}" not found.`);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

app.post("/movies", async (req, res) => {
  console.log("Received POST request");
  const requestBody = req.body;

  try {
    const data = await fs.readFile(pathDirectory, "utf8");
    const existingArray = JSON.parse(data);

    existingArray.push(requestBody);

    await fs.writeFile(
      pathDirectory,
      JSON.stringify(existingArray, null, 2),
      "utf8"
    );

    console.log(requestBody, "has successfully loaded");
    res.send("Movies.json updated successfully.");
  } catch (error) {
    console.error("Error updating movies.json:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});
app.delete("/deleteMovie/:movieTitle", async (req, res) => {
  const movieReqDelete = req.params.movieTitle;
  try {
    const data = await fs.readFile(pathDirectory, "utf8");
    const movies = JSON.parse(data);
    const movieIndex = movies.findIndex(
      (movie) => movie.Title.toLowerCase() === movieReqDelete.toLowerCase()
    );
    
    console.log("Movies before deletion:", movieIndex);

    if (movieIndex !== -1) {
      const deletedMovie = movies.splice(movieIndex, 1)[0];
      await fs.writeFile(
        pathDirectory,
        JSON.stringify(movies, null, 2),
        "utf8"
      );
      res.send(`${deletedMovie.Title} officially has been deleted!`);
    }
  } catch (error) {
    console.log(error);
  }
});
app.listen(3030, () => {
  console.log("server listen in port: 3030");
});
