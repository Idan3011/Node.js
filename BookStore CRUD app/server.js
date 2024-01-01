import "dotenv/config";
import express from "express";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import cores from "cores";
import booksRouter from "./routes/booksRouter.js";

const app = express();


app.use(cores());

app.use(express.json());

// Books Router
app.use("/EBookStore", booksRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listennig in por ${PORT}`);
});
