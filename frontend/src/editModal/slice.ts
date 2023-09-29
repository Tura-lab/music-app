import { EDIT_MUSIC_SUCCESS } from "../music/actions";
import { OPEN_EDIT_MODAL, CLOSE_EDIT_MODAL } from "./actions";

const initialState = {
  isOpen: false,
};

const editModalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case OPEN_EDIT_MODAL:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE_EDIT_MODAL:
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
};

export default editModalReducer;
