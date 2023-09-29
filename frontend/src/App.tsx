/** @jsxImportSource @emotion/react */

import "./App.css";
import Navbar from "./components/Navbar";
import SongList from "./components/SongList";
import EditModal from "./modals/EditModal";
import UploadModal from "./modals/UploadModal";
import DeleteModal from "./modals/DeleteModal";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div
      css={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
      }}
    >
      <Toaster position="bottom-center" reverseOrder={false} />
      <Navbar />
      <UploadModal />
      <EditModal />
      <DeleteModal />
      <SongList />
    </div>
  );
}

export default App;
