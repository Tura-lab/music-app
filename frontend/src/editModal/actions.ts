export const OPEN_EDIT_MODAL = "OPEN_EDIT_MODAL";
export const CLOSE_EDIT_MODAL = "CLOSE_EDIT_MODAL";

export const openEditModal = () => {
  return {
    type: OPEN_EDIT_MODAL,
  };
};

export const closeEditModal = () => {
  return {
    type: CLOSE_EDIT_MODAL,
  };
};