import { useRef } from "react";
import "./App.css";
import VideoPlayer from "./VideoPlayer";

function App() {
  const playerRef = useRef(null);
  const videoLink =
    "http://localhost:8080/uploads/chunks/0eb7f2f2-d5b1-470b-aca8-3014bc5ecd32/index.m3u8";

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL",
      },
    ],
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <VideoPlayer options={videoPlayerOptions} onReady={handlePlayerReady} />
  );
}

export default App;
