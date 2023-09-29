/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { editMusic } from "../music/actions";
import { closeEditModal } from "../editModal/actions";
import { RootState } from "../main";

import { toast } from "react-hot-toast";

const EditModal = (props: any) => {
  const selectedMusic = useSelector(
    (state: any) => state.musicReducer.selectedMusic
  );


  const [title, setTitle] = useState(selectedMusic ? selectedMusic.title : "");
  const [artist, setArtist] = useState(selectedMusic ? selectedMusic.artist : "")
  const [errors, setErrors] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const showModal = useSelector((state: RootState) => state.editModalReducer.isOpen);
  const editError = useSelector((state: RootState) => state.musicReducer.editError);
  const editSuccess = useSelector((state: RootState) => state.musicReducer.editSuccess);


  useEffect(() => {
    setOpenModal(showModal);
  }, [showModal]);

  useEffect(() => {
    if (selectedMusic) {
      setTitle(selectedMusic.title);
      setArtist(selectedMusic.artist);
    }
  }, [selectedMusic]);

  const handleModalClose = () => {
    setOpenModal(false);
    setTimeout(() => {
      dispatch(closeEditModal());
    }, 500);
  };

  useEffect(() => {
    if (editSuccess){
      console.log("YAPPPP edit succcess")
      toast.success("Music edited successfully");
      handleModalClose();
    }
  }, [editSuccess]);

  const handleMusicEdit = () => {
    if (!title || !artist) {
      setErrors(["Title and artist are required"]);
      return;
    }

    dispatch(editMusic({title, artist}, selectedMusic._id ));
  }

  if (!showModal) return null;

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 100,
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div
        css={{
          backgroundColor: "white",
          minWidth: "40rem",
          "@media (max-width: 660px)": {
            minWidth: "100%",
            borderRadius: "0",
          },
          borderRadius: "1rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          border: "none",
          padding: "2rem",
          transition: "transform 0.5s",
          transform: openModal ? "translateY(0)" : "translateY(-100vh)",
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "2rem",
          }}
        >
          {/* Title neger */}
          <div
            css={{
              fontSize: "1.5rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              position: "relative",
              width: "100%",
              paddingBottom: "1rem",
            }}
          >
            <div
              css={{
                fontSize: "2rem",
                fontWeight: 500,
              }}
            >
              Update Music
            </div>
            <div>
              <FiX
                onClick={handleModalClose}
                css={{
                  position: "absolute",
                  top: ".4rem",
                  right: ".4rem",
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              />
            </div>
          </div>
          {/* Content neger */}
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Music title"
              css={{
                width: "100%",
                height: "3.2rem",
                padding: ".5rem",
                borderRadius: ".5rem",
                border: "1px solid #ccc",
                fontSize: "1.4rem",
                fontWeight: 200,
              }}
            />
            <input
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              type="text"
              placeholder="Music artist"
              css={{
                width: "100%",
                height: "3.2rem",
                padding: ".5rem",
                zIndex: 13000,
                borderRadius: ".5rem",
                border: "1px solid #ccc",
                fontSize: "1.4rem",
                fontWeight: 200,
              }}
            />
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {errors && (
                <div
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  {errors.map((error) => (
                    <div
                      key={error}
                      css={{
                        display: "flex",
                        alignItems: "center",
                        color: "red",
                        fontWeight: 200,
                        fontSize: "1rem",
                        gap: ".3rem",
                      }}
                    >
                      <MdError />
                      <div
                        css={{
                          color: "red",
                          fontWeight: 200,
                        }}
                      >
                        {error}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={handleMusicEdit}
                css={{
                  width: "100%",
                  backgroundColor: "red",
                  color: "white",
                  padding: ".5rem 1rem",
                  borderRadius: ".5rem",
                  border: "none",
                  fontSize: "1.4rem",
                  fontWeight: 400,
                  ":hover": {
                    cursor: "pointer",
                    scale: ".97",
                  },
                  transition: "scale 0.5s",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
