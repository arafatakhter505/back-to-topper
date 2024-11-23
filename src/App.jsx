import React from "react";
import AllSettings from "./Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="bg-white rounded-lg p-5">
      <AllSettings />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
