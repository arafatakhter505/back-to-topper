import React, { useEffect, useState } from "react";
import GeneralSettings from "./components/GeneralSettings";
import ScrollSettings from "./components/ScrollSettings";
import ButtonAppearance from "./components/ButtonAppearance";
import Positioning from "./components/Positioning";

// Define the initial settings with default values
const initialSettings = {
  enabled: true,
  autoHide: true,
  hideSmallDevice: true,
  scrollDuration: 500,
  calculation: true,
  width: 50,
  height: 50,
  borderRadius: 15,
  hoverBorderRadius: 5,
  iconColor: "#fff",
  hoverIconColor: "#fff",
  bgColor: "#004CFF",
  hoverBgColor: "#000",
  left: "",
  right: 20,
  bottom: 20,
  icon: "/public/svg/arrow-15.svg",
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
};

const AllSettings = () => {
  // State for managing the active tab and settings
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState(initialSettings);

  // Load initial settings from a global object (e.g., WordPress)
  useEffect(() => {
    if (window.backToTopperSettings) {
      setSettings(window.backToTopperSettings.settings || initialSettings);
    }
  }, []);

  // Handle input field changes and update the corresponding setting
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Tabs to display in the settings panel
  const tabTitles = [
    "General Settings",
    "Scroll Settings",
    "Button Appearance",
    "Positioning",
  ];

  // Content for each tab
  const tabContents = [
    <GeneralSettings
      settings={settings}
      handleInputChange={handleInputChange}
    />,
    <ScrollSettings
      settings={settings}
      handleInputChange={handleInputChange}
    />,
    <ButtonAppearance
      settings={settings}
      handleInputChange={handleInputChange}
    />,
    <Positioning
      settings={settings}
      handleInputChange={handleInputChange}
      setSettings={setSettings}
    />,
  ];

  return (
    <div className="twsbtt-w-full">
      {/* Tab navigation buttons */}
      <div className="twsbtt-flex twsbtt-space-x-4 twsbtt-border-b">
        {tabTitles.map((tabTitle, index) => (
          <button
            key={index}
            className={`twsbtt-py-2 twsbtt-px-4 focus:twsbtt-outline-none ${
              activeTab === index
                ? "twsbtt-border-b-2 twsbtt-border-blue-500 twsbtt-text-blue-500"
                : "twsbtt-text-gray-600"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tabTitle}
          </button>
        ))}
      </div>

      {/* Display the content of the selected tab */}
      <div className="twsbtt-p-4">{tabContents[activeTab]}</div>
    </div>
  );
};

export default AllSettings;
