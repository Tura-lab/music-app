export const OPEN_DELETE_MODAL = "OPEN_DELETE_MODAL";
export const CLOSE_DELETE_MODAL = "CLOSE_DELETE_MODAL";

export const openDeleteModal = () => {
  return {
    type: OPEN_DELETE_MODAL,
  };
};

export const closeDeleteModal = () => {
  return {
    type: CLOSE_DELETE_MODAL,
  };
};