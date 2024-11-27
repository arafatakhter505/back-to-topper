import React, { useState } from "react";
import { toast } from "react-toastify";
import icons from "../icons";

/**
 * CheckboxInput component for reusable checkbox elements
 */
const CheckboxInput = ({ name, label, checked, onChange }) => (
  <label className="label cursor-pointer flex gap-2">
    <input type="checkbox" name={name} checked={checked} onChange={onChange} />
    <span className="label-text">{label}</span>
  </label>
);

/**
 * GeneralSettings component for handling general settings
 */
const GeneralSettings = ({ settings, handleInputChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission (save settings)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const nonce = window.backToTopperSettings.nonce;

    try {
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
    } catch (error) {
      toast.error("An error occurred while saving settings.");
      console.error("Error during settings save:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="form-control flex flex-row items-center gap-5">
        <CheckboxInput
          name="enabled"
          label="Enabled"
          checked={settings.enabled || false}
          onChange={handleInputChange}
        />
        <CheckboxInput
          name="autoHide"
          label="Auto Hide"
          checked={settings.autoHide || true}
          onChange={handleInputChange}
        />
        <CheckboxInput
          name="hideSmallDevice"
          label="Hide On Small Device"
          checked={settings.hideSmallDevice || false}
          onChange={handleInputChange}
        />
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
              onChange={handleInputChange}
            />
            <label htmlFor={item.src} className="w-10 h-10 cursor-pointer">
              {item.icon}
            </label>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className={`btn btn-success text-white w-[100px] btn-sm`}
        disabled={isLoading} // Disable the button when loading
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default GeneralSettings;
