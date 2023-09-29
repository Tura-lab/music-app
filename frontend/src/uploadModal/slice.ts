import {
    OPEN_UPLOAD_MODAL,
    CLOSE_UPLOAD_MODAL,
} from "./actions";

const initialState = {
    isOpen: false,
};

const uploadModalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case OPEN_UPLOAD_MODAL:
            return {
                ...state,
                isOpen: true,
            };
        case CLOSE_UPLOAD_MODAL:
            return {
                ...state,
                isOpen: false,
            };
        default:
            return state;
    }
};

export default uploadModalReducer;