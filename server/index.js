import express from "express";
import cors from "cors";
import { upload } from "./multer.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { exec } from "child_process"; // illegal usage

const app = express();
const PORT = 8080;

app.use(cors({ origin: ["http://localhost:5173"] }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/", function (req, res) {
  res.json({ message: "Video Streaming..." });
});
app.post("/upload", upload.single("file"), function (req, res) {
  const lessonId = uuidv4();
  const videoPath = req.file.path;
  const outputPath = `./uploads/chunks/${lessonId}`;
  const hlsPath = `${outputPath}/index.m3u8`;
  console.log("hlsPath", hlsPath);

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  // ffmpeg
  const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}

`;

  // no queue usage, not to be used in production
  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.log(`exec error: ${error}`);
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    const videoUrl = `http://localhost:8080/uploads/chunks/${lessonId}/index.m3u8`;

    res.json({
      message: "Video converted to HLS format",
      videoUrl: videoUrl,
      lessonId: lessonId,
    });
  });
});

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}`);
});
