import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const PORT = 8080;

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}`);
});
