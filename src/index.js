// Import React and the necessary functions for rendering
import React from "react";
import { createRoot } from "react-dom/client";

// Import the main App component
import App from "./App";

// Import the global stylesheet
import "./style.css";

/**
 * Entry point for the React application.
 * Renders the App component into the DOM element with the specified id.
 */
const rootElement = document.getElementById("twsbtt-admin-root");

// Ensure the root element exists before rendering
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
}
