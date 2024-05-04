import express from "express";
import cors from "cors";
import { upload } from "./multer.js";

const app = express();
const PORT = 8080;

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/", function (req, res) {
  res.json({ message: "Video Streaming..." });
});
app.post("/upload", upload.single("file"), function (req, res) {
  res.json({ message: "file uploaded." });
});

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}`);
});
