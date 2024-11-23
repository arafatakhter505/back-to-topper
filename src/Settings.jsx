import React, { useEffect, useState } from "react";
import GeneralSettings from "./components/GeneralSettings";
import ScrollSettings from "./components/ScrollSettings";
import ButtonAppearance from "./components/ButtonAppearance";
import Positioning from "./components/Positioning";

const initialSettings = {
  enabled: true,
  autoHide: false,
  hideSmallDevice: true,
  scrollOffset: 0,
  scrollDuration: 0,
  calculation: true,
  width: 50,
  height: 50,
  opacity: 0,
  fadeDuration: 0,
  textColor: "#fff",
  bgColor: "#000",
  hoverTextColor: "#000",
  hoverBgColor: "#00a96e",
  left: "",
  right: 20,
  bottom: 20,
};

const AllSettings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState(initialSettings);

  // Load initial settings from the WordPress backend
  useEffect(() => {
    if (window.backToTopperSettings) {
      setSettings(window.backToTopperSettings.settings || initialSettings);
    }
  }, []);

  // Handle changes to input fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const tabs = [
    "General Settings",
    "Scroll Settings",
    "Button Appearance",
    "Positioning",
  ];

  const tabContents = [
    <GeneralSettings settings={settings} handleChange={handleChange} />,
    <ScrollSettings settings={settings} handleChange={handleChange} />,
    <ButtonAppearance settings={settings} handleChange={handleChange} />,
    <Positioning
      settings={settings}
      handleChange={handleChange}
      setSettings={setSettings}
    />,
  ];

  return (
    <div className="w-full">
      <div className="flex space-x-4 border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 focus:outline-none ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4">{tabContents[activeTab]}</div>
    </div>
  );
};

export default AllSettings;
