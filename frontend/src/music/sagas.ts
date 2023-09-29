import { takeEvery, put, call, all } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_MUSIC,
  ADD_MUSIC_FAILED,
  ADD_MUSIC_SUCCESS,
  DELETE_MUSIC,
  DELETE_MUSIC_FAILED,
  DELETE_MUSIC_SUCCESS,
  EDIT_MUSIC,
  EDIT_MUSIC_FAILED,
  EDIT_MUSIC_SUCCESS,
  GET_ALL_MUSICS,
  GET_ALL_MUSICS_FAILED,
  GET_ALL_MUSICS_SUCCESS,
  GET_FAVORITES,
  GET_MUSIC_BY_ID,
  GET_MUSIC_BY_ID_FAILED,
  GET_MUSIC_BY_ID_SUCCESS,
  ADD_MUSIC_REQUESTED,
  DELETE_MUSIC_REQUESTED,
  EDIT_MUSIC_REQUESTED,
  GET_ALL_MUSICS_REQUESTED,
} from "./actions";

const baseUrl = "http://localhost:3000";

const getFavoritesFetch = async (userId: string) => {
  const response = await axios.get(`${baseUrl}/music/favorites/${userId}`);
  return response.data;
};

const getAllMusicsFetch = async () => {
  const response = await axios.get(`${baseUrl}/music`);
  return response.data;
}

const getMusicByIdFetch = async (id: string) => {
  const response = await axios.get(`${baseUrl}/music/${id}`);
  return response.data;
}

const addMusicFetch = async (music: any) => {
  const response = await axios.post(`${baseUrl}/music`, music);
  return response.data;
}

const editMusicFetch = async (id: string, music: any) => {
  const response = await axios.patch(`${baseUrl}/music/${id}`, music);
  return response.data;
}

const deleteMusicFetch = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/music/${id}`);
  return response.data;
}

function* workGetAllMusics(): any {
  try {
    yield put({ type: GET_ALL_MUSICS_REQUESTED });
    const allMusics = yield call(getAllMusicsFetch);
    yield put({ type: GET_ALL_MUSICS_SUCCESS, payload: allMusics });
  } catch (e: any) {
    yield put({ type: GET_ALL_MUSICS_FAILED, message: e.message });
  }
}

function* workGetMusicById(action: any): any {
  try {
    const response = yield call(getMusicByIdFetch, action.id);
    yield put({ type: GET_MUSIC_BY_ID_SUCCESS, payload: response.data });
  } catch (e: any) {
    yield put({ type: GET_MUSIC_BY_ID_FAILED, message: e.message });
  }
}

function* workAddMusic(action: any): any {
  try {
    yield put({ type: ADD_MUSIC_REQUESTED });
    const music = yield call(addMusicFetch, action.payload)
    yield put({ type: ADD_MUSIC_SUCCESS, payload: music });
  } catch (e: any) {
    yield put({ type: ADD_MUSIC_FAILED, message: e.message });
  }
}

function* workEditMusic(action: any): any {
  try {
    yield put({ type: EDIT_MUSIC_REQUESTED, id: action.id });
    const music = yield call(editMusicFetch, action.id,  action.payload)
    yield put({ type: EDIT_MUSIC_SUCCESS, payload: music, id: action.id });
  } catch (e: any) {
    yield put({ type: EDIT_MUSIC_FAILED, message: e.message, id: action.id });
  }
}

function* workDeleteMusic(action: any): any {
  try {
    yield put({ type: DELETE_MUSIC_REQUESTED, id: action.id });
    const response = yield call(deleteMusicFetch, action.id)
    yield put({ type: DELETE_MUSIC_SUCCESS, payload: response.data, id: action.id });
  } catch (e: any) {
    yield put({ type: DELETE_MUSIC_FAILED, message: e.message, id: action.id });
  }
}

function* workGetFavorites(action: any): any {
  try {
    const response = yield call(getFavoritesFetch, action.userId);
    yield put({ type: GET_ALL_MUSICS_SUCCESS, payload: response.data });
  } catch (e: any) {
    yield put({ type: GET_ALL_MUSICS_FAILED, message: e.message });
  }
}

// Sagas STARTS HERE
function* getAllMusicsSaga() {
  yield takeEvery(GET_ALL_MUSICS, workGetAllMusics);
}

function* getMusicByIdSaga() {
  yield takeEvery(GET_MUSIC_BY_ID, workGetMusicById);
}

function* addMusicSaga() {
  yield takeEvery(ADD_MUSIC, workAddMusic);
}

function* editMusicSaga() {
  yield takeEvery(EDIT_MUSIC, workEditMusic);
}

function* deleteMusicSaga() {
  yield takeEvery(DELETE_MUSIC, workDeleteMusic);
}

function* getFavoritesSaga() {
  yield takeEvery(GET_FAVORITES, workGetFavorites);
}

// Sagas ENDS HERE

export default function* rootSaga() {
  yield all ([
    getAllMusicsSaga(),
    getMusicByIdSaga(),
    addMusicSaga(),
    editMusicSaga(),
    deleteMusicSaga(),
    getFavoritesSaga(),
  ]);
}
