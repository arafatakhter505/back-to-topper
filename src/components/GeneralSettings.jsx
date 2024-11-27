import React from "react";
import { toast } from "react-toastify";
import icons from "../icons";

const GeneralSettings = ({ settings, handleChange }) => {
  // Handle form submission (save settings)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the nonce from the global window object
    const nonce = window.backToTopperSettings.nonce;

    const response = await fetch(window.backToTopperSettings.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": nonce, // Add nonce to the request for authentication
      },
      body: JSON.stringify(settings),
    });

    const result = await response.json();
    if (response.ok) {
      toast.success("Settings saved successfully!");
    } else {
      toast.error(`Failed to save settings: ${result.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="form-control flex flex-row items-center gap-5">
        <label className="label cursor-pointer flex gap-2">
          <input
            type="checkbox"
            name="enabled"
            checked={settings.enabled || false}
            onChange={handleChange}
          />
          <span className="label-text">Enabled</span>
        </label>
        <label className="label cursor-pointer flex gap-2">
          <input
            type="checkbox"
            name="autoHide"
            checked={settings.autoHide || false}
            onChange={handleChange}
          />
          <span className="label-text">Auto Hide</span>
        </label>
        <label className="label cursor-pointer flex gap-2">
          <input
            type="checkbox"
            name="hideSmallDevice"
            checked={settings.hideSmallDevice || false}
            onChange={handleChange}
          />
          <span className="label-text">Hide On Small Device</span>
        </label>
      </div>
      <div className="flex flex-row items-center gap-8 flex-wrap">
        {icons.map((item) => (
          <div key={item.src} className="flex items-center gap-2">
            <input
              type="radio"
              id={item.src}
              name="icon"
              value={item.src}
              checked={settings.icon === item.src}
              onChange={handleChange}
            />
            <label htmlFor={item.src} className="w-10 h-10 cursor-pointer">
              {item.icon}
            </label>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="btn btn-success text-white w-[100px] btn-sm"
      >
        Save
      </button>
    </form>
  );
};

export default GeneralSettings;
