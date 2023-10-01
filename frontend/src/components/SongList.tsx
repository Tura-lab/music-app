/** @jsxImportSource @emotion/react */

import React, { useEffect } from "react";
import Container from "./Container";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSolidPencil, BiTimeFive } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";
import { openEditModal } from "../editModal/actions";
import {
  getAllMusics,
  setMusicPlay,
  setPlayingMusic,
  setSelectedMusic,
} from "../music/actions";
import { openDeleteModal } from "../deleteModal/actions";
import { RootState } from "../main";
import ThreeDotLoader from "./ThreeDotLoader";
import { toast } from "react-hot-toast";

const SongList = () => {
  const dispatch = useDispatch();
  const musics = useSelector((state: any) => state.musicReducer.musics);
  const getAllPending = useSelector(
    (state: RootState) => state.musicReducer.getAllPending
  );
  const getAllError = useSelector(
    (state: RootState) => state.musicReducer.getAllError
  );
  const playingMusic = useSelector((state: RootState) => state.musicReducer.playingMusic);
  const isPlaying = useSelector((state: RootState) => state.musicReducer.musicPlaying);

  useEffect(() => {
    // get all musics
    dispatch(getAllMusics());
  }, []);

  useEffect(() => {
    if (getAllError) {
      toast.error("Something went wrong");
    }
  }, [getAllError]);

  const handlePlayClick = (id: string) => {
    if (playingMusic?._id === id) {
      dispatch(setMusicPlay(!isPlaying));
      return;
    }

    // set the playing music
    dispatch(setPlayingMusic(id));
  };

  const handleDeleteClick = (id: string) => {
    // set the selected music
    dispatch(setSelectedMusic(id));

    // open the delete modal
    dispatch(openDeleteModal());
  };

  const handleEditClick = (id: string) => {
    //
    // Set the selected music
    dispatch(setSelectedMusic(id));

    // Open the edit modal
    dispatch(openEditModal());
  };

  return (
    <Container>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 10rem",
          "@media (max-width: 890px)": {
            padding: "2rem 1rem",
          },
        }}
      >
        <div
          css={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: ".1fr 1fr 1fr 1fr .1fr",
            "@media (max-width: 600px)": {
              gridTemplateColumns: ".1fr 1fr .4fr .1fr",
            },
            gridRowGap: ".7rem",
          }}
        >
          <div
            css={{
              textAlign: "left",
              borderBottom: "1px solid black",
            }}
          >
            #
          </div>
          <div
            css={{
              textAlign: "left",
              borderBottom: "1px solid black",
            }}
          >
            Title
          </div>
          <div
            css={{
              textAlign: "left",
              borderBottom: "1px solid black",
              "@media (max-width: 600px)": {
                display: "none",
              },
            }}
          >
            Date added
          </div>
          <div
            css={{
              textAlign: "left",
              borderBottom: "1px solid black",
            }}
          ></div>
          <div
            css={{
              textAlign: "left",
              borderBottom: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <BiTimeFive size={24} />
          </div>
          {getAllPending && (
            <div
              css={{
                position: "absolute",
                top: "50%",
                left: "50%",
              }}
            >
              <ThreeDotLoader />
            </div>
          )}
          {musics.map((music: any, i: any) => (
            <React.Fragment key={i}>
              <div
                css={{
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {i + 1}
              </div>
              <div
                css={{
                  textAlign: "left",
                }}
              >
                <div
                  css={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <div onClick={() => handlePlayClick(music._id)}>
                    {playingMusic?._id === music._id && isPlaying ? (<AiFillPauseCircle css={{ textAlign: "left" }} size={32} />) : (<AiFillPlayCircle css={{ textAlign: "left" }} size={32} />)}
                  </div>
                  <div
                    css={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0rem",
                    }}
                  >
                    <div
                      css={{
                        fontWeight: 500,
                      }}
                    >
                      {/* trim if it is longer than 15 */}
                      {music.title.length > 15
                        ? music.title.slice(0, 15) + "..."
                        : music.title}
                    </div>
                    <div
                      css={{
                        fontSize: ".9rem",
                      }}
                    >
                      {/* trim if it is longer than 15 */}
                      {music.artist.length > 15
                        ? music.artist.slice(0, 15) + "..."
                        : music.artist}
                    </div>
                  </div>
                </div>
              </div>
              <div
                css={{
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  "@media (max-width: 600px)": {
                    display: "none",
                  },
                }}
              >
                {/* convert to form "sep 20 2000" */}
                {new Date(music.createdAt).toDateString().slice(4)}
              </div>
              <div
                css={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: ".5rem",
                }}
              >
                <button
                  onClick={() => handleEditClick(music._id)}
                  css={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: ".2rem",
                    padding: ".2rem .6rem",
                    borderRadius: ".5rem",
                    border: "none",
                    backgroundColor: "black",
                    ":hover": {
                      color: "white",
                      cursor: "pointer",
                      backgroundColor: "rgba(0,0,0,.4)",
                    },
                    "@media (max-width: 600px)": {
                      padding: ".2rem .2rem",
                      borderRadius: "5rem",
                    },
                  }}
                >
                  <BiSolidPencil size={20} />
                  <div
                    css={{
                      fontSize: ".9rem",
                      "@media (max-width: 600px)": {
                        display: "none",
                      },
                    }}
                  >
                    Edit
                  </div>
                </button>
                <button
                  onClick={() => handleDeleteClick(music._id)}
                  css={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: ".2rem",
                    padding: ".2rem .6rem",
                    borderRadius: ".5rem",
                    border: "none",
                    backgroundColor: "red",
                    ":hover": {
                      cursor: "pointer",
                      backgroundColor: "rgba(255,0,0,.4)",
                    },
                    "@media (max-width: 600px)": {
                      padding: ".2rem .2rem",
                      borderRadius: "5rem",
                    },
                  }}
                >
                  <BsTrashFill size={20} />
                  <div
                    css={{
                      fontSize: ".9rem",
                      "@media (max-width: 600px)": {
                        display: "none",
                      },
                    }}
                  >
                    Delete
                  </div>
                </button>
              </div>
              <div
                css={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {music.duration}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default SongList;
