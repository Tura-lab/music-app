/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import { FiMusic, FiUpload, FiX } from "react-icons/fi";
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addMusic } from "../music/actions";
import { closeUploadModal } from "../uploadModal/actions";

import { toast } from "react-hot-toast";
import ThreeDotLoader from "../components/ThreeDotLoader";

const UploadModal = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);

  const dispatch = useDispatch();
  const showModal = useSelector(
    (state: any) => state.uploadModalReducer.isOpen
  );
  const addSuccess = useSelector((state: any) => state.musicReducer.addSuccess);
  const addError = useSelector((state: any) => state.musicReducer.addError);
  const addPending = useSelector((state: any) => state.musicReducer.addPending);

  useEffect(() => {
    setOpenModal(showModal);
  }, [showModal]);

  useEffect(() => {
    if (addSuccess) {
      console.log("YAPPPP add succcess");
      // clear form
      setFile(null);
      setTitle("");
      setArtist("");

      toast.success("Music added successfully");
      handleModalClose();
    }
    if (addError) {
      console.log("YAPPPP add error");
      toast.error("Something went wrong");
    }
  }, [addSuccess, addError, addPending]);

  const handleModalClose = () => {
    setOpenModal(false);
    setTimeout(() => {
      dispatch(closeUploadModal());
    }, 500);
  };

  const handleMusicSubmit = () => {
    // clear errors
    setErrors([]);

    if (!file) {
      // check if it doesn't already have an error
      if (errors.includes("File is required")) return;
      setErrors([...errors, "File is required"]);
      return;
    }
    if (!title) {
      if (errors.includes("Title is required")) return;
      setErrors([...errors, "Title is required"]);
      return;
    }
    if (!artist) {
      if (errors.includes("Artist is required")) return;
      setErrors([...errors, "Artist is required"]);
      return;
    }

    var fileToSend: any = {
      title,
      artist,
    };

    const audtio = new Audio();
    audtio.src = URL.createObjectURL(file);
    audtio.onloadedmetadata = async () => {
      const duration = await audtio.duration;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);

      fileToSend.duration = `${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;

      // // digest the file to base64 to send to the server
      // const reader = new FileReader();
      // reader.readAsDataURL(file!);
      // reader.onloadend = () => {
      //   // dispatch action

      //   if (typeof reader.result !== "string") return;
      //   fileToSend.file = reader.result;

      // };
      dispatch(addMusic(fileToSend));
    };
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragActive) return;
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragActive) return;
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    // check if the file is audio
    if (e.dataTransfer.files[0].type.split("/")[0] !== "audio") {
      setErrors([...errors, "File must be audio"]);
      return;
    }

    setFile(e.dataTransfer.files[0]);
  };

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
              Upload Music
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
              onDragOver={handleDragEnter}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                borderRadius: ".5rem",
                border: dragActive ? "4px dashed red" : "2px dashed red",
                height: "9rem",
                ":hover": {
                  cursor: "pointer",
                },
                fontSize: "1.4rem",
                fontWeight: 200,
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                multiple={false}
                onChange={(e) => setFile(e.target.files![0])}
                css={{
                  display: "none",
                }}
              />
              {file ? (
                <div
                  css={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <FiMusic />
                  {file.name.slice(0, 17) +
                    (file.name.length > 17 ? "..." : "")}
                </div>
              ) : (
                <>
                  <FiUpload />
                  <div>
                    {dragActive ? "Drop here" : "Click or drag and drop"}
                  </div>
                </>
              )}
            </div>
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
                disabled={addPending}
                onClick={handleMusicSubmit}
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
                {addPending && (
                  <div css={{ padding: "1rem 0" }}>
                    <ThreeDotLoader />
                  </div>
                )}
                {!addPending && "Upload"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
