export const OPEN_UPLOAD_MODAL = "OPEN_UPLOAD_MODAL";
export const CLOSE_UPLOAD_MODAL = "CLOSE_UPLOAD_MODAL";

export const openUploadModal = () => {
  return {
    type: OPEN_UPLOAD_MODAL,
  };
};

export const closeUploadModal = () => {
  return {
    type: CLOSE_UPLOAD_MODAL,
  };
};
