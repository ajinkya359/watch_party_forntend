import React, { createRef, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@material-ui/icons/Send";
import { socket } from "../SocketConnection";

import "./Videoplayer.css";

// https://www.youtube.com/watch?v=-RTNaG8yWVY&ab_channel=ClipHD

function VideoPlayer(props) {
  const [isPlaying, setisPlaying] = useState(true);
  const [url, seturl] = useState("");
  const react_player_ref = useRef();
  const handleVideoUrl = () => {
    const field = document.getElementById("video_url");
    socket.emit("send-video-url-to-server", field.value, props.room_id);
    seturl(field.value);
  };

  useEffect(() => {
    socket.on("get-video-url-from-server", (url) => {
      seturl(url);
      console.log("Got from server", url);
    });
    seturl(url);
    console.log("Got from server", url);
    socket.on("pause_the_video_from_server", (time) => {
      react_player_ref.current.seekTo(time,'seconds')
      if(isPlaying===true){
        console.log("stop the video");

      setisPlaying(false);
    }
    });
    socket.on("play_the_video_from_server", (time) => {
      react_player_ref.current.seekTo(time,'seconds')

      if (Math.abs(react_player_ref.current.getCurrentTime() - time > 5))
      console.log("play the video");
      setisPlaying(true);
    });
  }, []);

  const handlePause = () => {
    console.log("pausing video telling everyone");
    socket.emit(
      "pause_the_video_from_client",
      props.room_id,
      react_player_ref.current.getCurrentTime()
    );
    setisPlaying(false);
  };
  const handlePlay = () => {
    console.log("playing video telling everyone");
    if (isPlaying === false)
      socket.emit(
        "play_the_video_from_client",
        props.room_id,
        react_player_ref.current.getCurrentTime()
      );
    setisPlaying(true);
  };

  return (
    <div className="react_player">
      <ReactPlayer
        ref={react_player_ref}
        width="70vw"
        height="78vh"
        controls
        onPlay={handlePlay}
        playing={isPlaying}
        onPause={handlePause}
        url={url}
      />
      <div className="console">
        <TextField
          label="Enter video url."
          className="message_input"
          variant="outlined"
          id="video_url"
        />
        <Button
          variant="contained"
          className="send_button"
          endIcon={<SendIcon />}
          //   onClick={}
          onClick={handleVideoUrl}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default VideoPlayer;
