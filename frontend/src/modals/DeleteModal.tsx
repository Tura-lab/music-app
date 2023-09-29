/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { deleteMusic } from "../music/actions";
import { RootState } from "../main";
import { closeDeleteModal } from "../deleteModal/actions";
import { toast } from "react-hot-toast";

const DeleteModal = () => {
  const selectedMusic = useSelector(
    (state: any) => state.musicReducer.selectedMusic
  );

  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const showModal = useSelector((state: RootState) => state.deleteModalReducer.isOpen);
  const deleteError = useSelector((state: RootState) => state.musicReducer.deleteError);
  const deleteSuccess = useSelector((state: RootState) => state.musicReducer.deleteSuccess);

  useEffect(() => {
    setOpenModal(showModal);
  }, [showModal]);

  const handleModalClose = () => {
    setOpenModal(false);
    setTimeout(() => {
      dispatch(closeDeleteModal());
    }, 500);
  };
  
  useEffect(() => {
    if (deleteSuccess){
      console.log("YAPPPP delete success");
      handleModalClose();
      toast.success("Music deleted successfully");
    }
  }, [deleteSuccess]);

  const handleDeleteMusic = () => {
    dispatch(deleteMusic(selectedMusic._id));
    if (deleteSuccess){
    }
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
              Delete Music
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
            <div>
                Are you sure you want to delete the song "<b>{selectedMusic.title}</b>"?
            </div>
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <button
                onClick={handleDeleteMusic}
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
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
