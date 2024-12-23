// Import React and necessary components
import React from "react";

// Import custom components and libraries
import AllSettings from "./Settings";
import { ToastContainer } from "react-toastify";

// Import stylesheets for Toast notifications
import "react-toastify/dist/ReactToastify.css";

/**
 * App component that encapsulates settings and toast notifications
 * @returns {JSX.Element} The root component of the application
 */
const App = () => {
  return (
    <div className="twsbtt-bg-white twsbtt-rounded-lg twsbtt-p-5">
      {/* Render settings component */}
      <AllSettings />

      {/* Toast notifications container */}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

// Export App component as default
export default App;
