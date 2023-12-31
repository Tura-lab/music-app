import {
  GET_ALL_MUSICS_FAILED,
  ADD_MUSIC_FAILED,
  ADD_MUSIC_SUCCESS,
  DELETE_MUSIC_FAILED,
  DELETE_MUSIC_SUCCESS,
  EDIT_MUSIC_FAILED,
  EDIT_MUSIC_SUCCESS,
  GET_ALL_MUSICS_SUCCESS,
  GET_FAVORITES_FAILED,
  GET_FAVORITES_SUCCESS,
  GET_MUSIC_BY_ID_FAILED,
  GET_MUSIC_BY_ID_SUCCESS,
  SET_SELECTED_MUSIC,
  GET_ALL_MUSICS_REQUESTED,
  ADD_MUSIC_REQUESTED,
  DELETE_MUSIC_REQUESTED,
  EDIT_MUSIC_REQUESTED,
  SET_PLAYING_MUSIC,
  SET_MUSIC_PLAY,
  PLAY_NEXT,
  PLAY_PREVIOUS
} from "./actions";

interface MusicState {
  musics: any[];
  selectedMusic: any;
  playingMusic: any;
  musicPlaying: boolean;

  getAllPending: boolean;
  getAllSuccess: boolean | null;
  getAllError: boolean | null;

  addPending: boolean;
  addSuccess: boolean | null;
  addError: boolean | null;

  deletePending: boolean;
  deleteSuccess: boolean | null;
  deleteError: boolean | null;

  editPending: boolean;
  editSuccess: boolean | null;
  editError: boolean | null;
}

const initialState: MusicState = {
  musics: [],
  selectedMusic: null,

  playingMusic: null,
  musicPlaying: false,

  getAllPending: false,
  getAllSuccess: null,
  getAllError: null,

  addPending: false,
  addSuccess: null,
  addError: null,

  deletePending: false,
  deleteSuccess: null,
  deleteError: null,

  editPending: false,
  editSuccess: null,
  editError: null,
};

const musicReducer = (state = initialState, action: any): MusicState => {
  switch (action.type) {
    case ADD_MUSIC_REQUESTED:
      return {
        ...state,
        addPending: true,
        addSuccess: null,
        addError: null,
      };
    case GET_ALL_MUSICS_REQUESTED:
      return {
        ...state,
        getAllPending: true,
        getAllSuccess: null,
        getAllError: null,
      };
    case GET_ALL_MUSICS_SUCCESS:
      return {
        ...state,
        getAllSuccess: true,
        getAllError: false,
        getAllPending: false,
        musics: action.payload,
      };
    case GET_ALL_MUSICS_FAILED:
      return {
        ...state,
        getAllSuccess: false,
        getAllError: true,
        getAllPending: false,
      };
    case GET_MUSIC_BY_ID_SUCCESS:
      return {
        ...state,
        selectedMusic: action.payload,
      };
    case GET_MUSIC_BY_ID_FAILED:
      return {
        ...state,
      };
    case DELETE_MUSIC_REQUESTED:
      return {
        ...state,
        deletePending: true,
        deleteSuccess: null,
        deleteError: null,
      };
    case ADD_MUSIC_SUCCESS:
      return {
        ...state,
        addError: false,
        addSuccess: true,
        addPending: false,
        musics: [action.payload, ...state.musics],
      };
    case ADD_MUSIC_FAILED:
      return {
        ...state,
        addError: true,
        addSuccess: false,
        addPending: false,
      };
    case EDIT_MUSIC_REQUESTED:
      return {
        ...state,
        editPending: true,
        editSuccess: null,
        editError: null,
      };
    case EDIT_MUSIC_SUCCESS:
      return {
        ...state,
        editError: false,
        editSuccess: true,
        editPending: false,
        musics: state.musics.map((music: any) =>
          music._id === action.id ? action.payload : music
        ),
      };
    case EDIT_MUSIC_FAILED:
      return {
        ...state,
        editError: true,
        editSuccess: false,
        editPending: false,
      };
    case DELETE_MUSIC_REQUESTED:
      return {
        ...state,
        deletePending: true,
        deleteSuccess: null,
        deleteError: null,
      };
    case DELETE_MUSIC_SUCCESS:
      return {
        ...state,
        deleteError: false,
        deleteSuccess: true,
        deletePending: false,
        musics: state.musics.filter((music: any) => music._id !== action.id),
      };

    case DELETE_MUSIC_FAILED:
      return {
        ...state,
        deleteError: true,
        deletePending: false,
        deleteSuccess: false,
      };
    case GET_FAVORITES_SUCCESS:
      return {
        ...state,
        musics: action.payload,
      };
    case GET_FAVORITES_FAILED:
      return {
        ...state,
      };
    case SET_SELECTED_MUSIC:
      const music = state.musics.find(
        (music: any) => music._id === action.payload
      );
      return {
        ...state,
        selectedMusic: music,
      };

    case SET_PLAYING_MUSIC:
      const musicPlaying = state.musics.find(
        (music: any) => music._id === action.payload
      );
      return {
        ...state,
        playingMusic: musicPlaying,
        musicPlaying: true,
      };

    case SET_MUSIC_PLAY:
      return {
        ...state,
        musicPlaying: action.payload,
      };

    case PLAY_NEXT:
    
      // find the index of the current music
      const index = state.musics.findIndex(
        (music: any) => music._id === state.playingMusic._id
      );

      // get the next music if it is the last one, get the first one
      const nextMusic = index === state.musics.length - 1
        ? state.musics[0]
        : state.musics[index + 1];

      return {
        ...state,
        playingMusic: nextMusic,
      };

    case PLAY_PREVIOUS:
      // find the index of the current music
      const indexPrevious = state.musics.findIndex(
        (music: any) => music._id === state.playingMusic._id
      );

      // get the previous music if it is the first one, get the last one
      const previousMusic = indexPrevious === 0
        ? state.musics[state.musics.length - 1]
        : state.musics[indexPrevious - 1];

      return {
        ...state,
        playingMusic: previousMusic,
      };

    default:
      return state;
  }
};

export default musicReducer;
