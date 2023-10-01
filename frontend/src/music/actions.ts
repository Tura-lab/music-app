export const ADD_MUSIC_REQUESTED = "ADD_MUSIC_REQUESTED";
export const ADD_MUSIC = "ADD_MUSIC";
export const ADD_MUSIC_SUCCESS = "ADD_MUSIC_SUCCESS";
export const ADD_MUSIC_FAILED = "ADD_MUSIC_FAILED";
export const DELETE_MUSIC_REQUESTED = "DELETE_MUSIC_REQUESTED";
export const DELETE_MUSIC = "DELETE_MUSIC";
export const DELETE_MUSIC_SUCCESS = "DELETE_MUSIC_SUCCESS";
export const DELETE_MUSIC_FAILED = "DELETE_MUSIC_FAILED";
export const EDIT_MUSIC_REQUESTED = "EDIT_MUSIC_REQUESTED";
export const EDIT_MUSIC = "EDIT_MUSIC";
export const EDIT_MUSIC_SUCCESS = "EDIT_MUSIC_SUCCESS";
export const EDIT_MUSIC_FAILED = "EDIT_MUSIC_FAILED";
export const GET_MUSIC_BY_ID = "GET_MUSIC_BY_ID";
export const GET_MUSIC_BY_ID_SUCCESS = "GET_MUSIC_BY_ID_SUCCESS";
export const GET_MUSIC_BY_ID_FAILED = "GET_MUSIC_BY_ID_FAILED";
export const GET_ALL_MUSICS_REQUESTED = "GET_ALL_MUSICS_REQUESTED";
export const GET_ALL_MUSICS = "GET_ALL_MUSICS";
export const GET_ALL_MUSICS_SUCCESS = "GET_ALL_MUSICS_SUCCESS";
export const GET_ALL_MUSICS_FAILED = "GET_ALL_MUSICS_FAILED";
export const GET_FAVORITES = "GET_FAVORITES";
export const GET_FAVORITES_SUCCESS = "GET_FAVORITES_SUCCESS";
export const GET_FAVORITES_FAILED = "GET_FAVORITES_FAILED";
export const SET_SELECTED_MUSIC = "SET_SELECTED_MUSIC";
export const SET_PLAYING_MUSIC = "SET_PLAYING_MUSIC";
export const SET_MUSIC_PLAY = "SET_MUSIC_PLAY";

export const addMusic = (music: Music) => {
  return {
    type: ADD_MUSIC,
    payload: music,
  };
};

export const editMusic = (music: Object, id: string) => {
  return {
    type: EDIT_MUSIC,
    payload: music,
    id: id,
  };
};

export const deleteMusic = (id: string) => {
  return {
    type: DELETE_MUSIC,
    id: id,
  };
};

export const setSelectedMusic = (id: String) => {
  return {
    type: SET_SELECTED_MUSIC,
    payload: id,
  };
};

export const getAllMusics = () => {
  return {
    type: GET_ALL_MUSICS,
  };
};

export const getMusicById = (id: string) => {
  return {
    type: GET_MUSIC_BY_ID,
    id: id,
  };
};

export const getFavorites = () => {
  return {
    type: GET_FAVORITES,
  };
};

export const setPlayingMusic = (id: string) => {
  console.log("setPlayingMusic", id)
  return {
    type: SET_PLAYING_MUSIC,
    payload: id,
  };
};

export const setMusicPlay = (playing: boolean) => {
  return {
    type: SET_MUSIC_PLAY,
    payload: playing,
  };
};

