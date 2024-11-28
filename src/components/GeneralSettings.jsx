import React, { useState } from "react";
import { toast } from "react-toastify";
import icons from "../icons";

/**
 * CheckboxInput component for reusable checkbox elements
 */
const CheckboxInput = ({ name, label, checked, onChange }) => (
  <label className="twsbtt-label twsbtt-cursor-pointer twsbtt-flex twsbtt-gap-2">
    <input type="checkbox" name={name} checked={checked} onChange={onChange} />
    <span className="twsbtt-label-text">{label}</span>
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
    <form onSubmit={handleSubmit} className="twsbtt-space-y-5">
      <div className="twsbtt-form-control twsbtt-flex twsbtt-flex-row twsbtt-items-center twsbtt-gap-5">
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

      <div className="twsbtt-flex twsbtt-flex-row twsbtt-items-center twsbtt-gap-8 twsbtt-flex-wrap">
        {icons.map((item) => (
          <div
            key={item.src}
            className="twsbtt-flex twsbtt-items-center twsbtt-gap-2"
          >
            <input
              type="radio"
              id={item.src}
              name="icon"
              value={item.src}
              checked={settings.icon === item.src}
              onChange={handleInputChange}
            />
            <label
              htmlFor={item.src}
              className="twsbtt-w-10 twsbtt-h-10 twsbtt-cursor-pointer"
            >
              {item.icon}
            </label>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className={`twsbtt-btn twsbtt-btn-success twsbtt-text-white twsbtt-w-[100px] twsbtt-btn-sm`}
        disabled={isLoading} // Disable the button when loading
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default GeneralSettings;
