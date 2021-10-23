import YouTube, { Options } from "react-youtube";
import React, { useState } from "react";
import styles from "./Player.module.scss";
import { PlayIcon, PauseIcon } from "@heroicons/react/solid";

function Player() {
  const opts: Options = {
    height: "0",
    width: "0",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const [videoId, setVideoId] = useState("0YdgmKjUG-o");
  const [title, setTitle] = useState("Chưa có bài hát nào.");
  const [player, setPlayer] = useState(null);
  const [playerState, setPlayerState] = useState();

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();

    setPlayer(event.target);
    setTitle(event.target.getVideoData().title);

    console.log(event.target);
  };

  const onStateChange = (event) => {
    console.log(event);
    setPlayerState(event.data);
  };

  const onPlaybackQualityChange = (event) => {
    console.log(event);
  };

  return (
    <>
      <div className={styles.top_notify}>
        {YouTube.PlayerState.PLAYING == playerState ? (
          <PauseIcon
            className="w-10 h-10 cursor-pointer"
            onClick={() => {
              console.log("Pause video clicked.");
              player.pauseVideo();
            }}
          />
        ) : (
          <PlayIcon
            className="w-10 h-10 cursor-pointer"
            onClick={() => {
              console.log("Play video clicked.");
              player.playVideo();
            }}
          />
        )}

        <div className="text-sm">Đang phát: {title}</div>
      </div>

      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onPlaybackQualityChange={onPlaybackQualityChange}
        onStateChange={onStateChange}
      />
    </>
  );
}

export default Player;
