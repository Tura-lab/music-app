import {
    OPEN_DELETE_MODAL,
    CLOSE_DELETE_MODAL,
} from "./actions";

const initialState = {
    isOpen: false,
};

const deleteModalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case OPEN_DELETE_MODAL:
            return {
                ...state,
                isOpen: true,
            };
        case CLOSE_DELETE_MODAL:
            return {
                ...state,
                isOpen: false,
            };
        default:
            return state;
    }
};

export default deleteModalReducer;