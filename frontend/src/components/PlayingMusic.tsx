/** @jsxImportSource @emotion/react */
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { RootState } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { playNext, playPrevious, setMusicPlay } from "../music/actions";
import { useEffect, useState } from "react";

const PlayingMusic = () => {
  const dispatch = useDispatch();

  const [timeElapsed, setTimeElapsed] = useState("0:00");
  const [timeElapsedInPercentage, setTimeElapsedInPercentage] = useState(0);

  const isPlaying = useSelector(
    (state: RootState) => state.musicReducer.musicPlaying
  );

  const playingMusic = useSelector(
    (state: RootState) => state.musicReducer.playingMusic
  );

  const getTimeElapsed = () => {
    if (!audio) {
      return "0:00";
    }
    // add a zero in front of the number if it is less than 10
    const addZero = (n: number) => (n < 10 ? "0" + n : n);
    // get the minutes
    const minutes = Math.floor(audio.currentTime / 60);
    // get the seconds
    const seconds = Math.floor(audio.currentTime % 60);
    // return the time elapsed
    return `${minutes}:${addZero(seconds)}`;
  };

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audio) {
      return;
    }
    const interval = setInterval(() => {
      setTimeElapsed(getTimeElapsed());
      setTimeElapsedInPercentage(
        (audio.currentTime / audio.duration) * 100 || 0
      );
    }, 1);
    return () => clearInterval(interval);
  }, [audio]);

  useEffect(() => {
    if (!playingMusic) {
      setAudio(null);
      return;
    }
    console.log("playingMusic", playingMusic.title);
    if (audio) {
      audio.pause();
    }

    // audio?.pause()
    // setAudio(new Audio(playingMusic.file));

    setAudio((aud) => {
      aud?.pause();
      return new Audio(playingMusic.file);
    });
  }, [playingMusic]);

  useEffect(() => {
    if (!audio) {
      return;
    }
    dispatch(setMusicPlay(true));
    audio.play();
  }, [audio]);


  useEffect(() => {
    console.log("isPlaying", isPlaying);
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  if (!playingMusic) {
    return null;
  }

  const togglePlaying = () => {
    console.log("togglePlaying");
    dispatch(setMusicPlay(!isPlaying));
  };

  return (
    <div
      css={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "9rem",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          gap: ".1rem",
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            css={{
              fontSize: "1.2rem",
              fontWeight: 500,
            }}
          >
            {playingMusic.title}
          </div>
          <div
            css={{
              fontSize: ".9rem",
              fontWeight: 100,
            }}
          >
            {playingMusic.artist}
          </div>
        </div>
        {/* The seek */}
        <div
          css={{
            display: "flex",
            width: "60%",
            "@media (max-width: 890px)": {
              width: "100%",
            },
            alignItems: "center",
            justifyContent: "center",
            gap: ".4rem",
          }}
        >
          <div>{timeElapsed}</div>
          <div
            css={{
              display: "flex",
              alignItems: "center",
              height: ".3rem",
              width: "100%",
              backgroundColor: "grey",
              borderRadius: "10%",
            }}
          >
            <div
              css={{
                width: timeElapsedInPercentage + "%",
                height: "100%",
                backgroundColor: "red",
                borderRadius: "10%",
                transition: "width .1s ease-in-out",
              }}
            ></div>
            {/* The circle thingy */}
            <div
              css={{
                width: "1rem",
                height: "1rem",
                backgroundColor: "red",
                // get the percentage of the time elapsed
                borderRadius: "50%",
                transtion: "scale .2s ease-in-out",
                ":hover": {
                  cursor: "pointer",
                  scale: "1.2",
                },
              }}
            ></div>
          </div>
          <div>{playingMusic.duration}</div>
        </div>
        {/* The controls */}
        <div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={() => {
              dispatch(playPrevious());
            }}
            css={{
              color: "grey",
              ":hover": {
                cursor: "pointer",
                color: "black",
              },
              transition: "color .2s",
            }}
          >
            <BiSkipPrevious size={40} />
          </div>
          <div
            onClick={togglePlaying}
            css={{
              ":hover": {
                cursor: "pointer",
                scale: "1.1",
              },
              transition: "scale .2s ease-in-out",
            }}
          >
            {isPlaying ? (
              <AiFillPauseCircle size={40} />
            ) : (
              <AiFillPlayCircle size={40} />
            )}
          </div>
          <div
            onClick={() => {
              dispatch(playNext());
            }}
            css={{
              color: "grey",
              ":hover": {
                cursor: "pointer",
                color: "black",
              },
              transition: "color .2s",
            }}
          >
            <BiSkipNext size={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayingMusic;
