import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Provider } from "react-redux/";
import musicReducer from "./music/slice.ts";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./music/sagas.ts";
import { configureStore } from "@reduxjs/toolkit";
import uploadModalReducer from "./uploadModal/slice.ts";
import editModalReducer from "./editModal/slice.ts";
import deleteModalReducer from "./deleteModal/slice.ts";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    musicReducer: musicReducer,
    uploadModalReducer: uploadModalReducer,
    editModalReducer: editModalReducer,
    deleteModalReducer: deleteModalReducer,
  },
  middleware: [saga],
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    
      <App />
    </Provider>
  </React.StrictMode>
);


