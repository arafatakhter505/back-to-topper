import React, { useState } from "react";
import { toast } from "react-toastify";

const Positioning = ({ settings, handleInputChange, setSettings }) => {
  const [isRight, setIsRight] = useState(settings.right !== "");
  const [isLoading, setIsLoading] = useState(false);

  // Handle position toggle between left and right
  const handlePositionToggle = () => {
    const newIsRight = !isRight;
    setIsRight(newIsRight);

    setSettings((prevSettings) => ({
      ...prevSettings,
      right: newIsRight ? 20 : "",
      left: newIsRight ? "" : 20,
    }));
  };

  // Handle form submission (save settings)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Get the nonce from the global window object
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
      <div className="twsbtt-grid lg:twsbtt-grid-cols-4 md:twsbtt-grid-cols-2 twsbtt-grid-cols-1 twsbtt-gap-5">
        <label className="twsbtt-form-control twsbtt-w-full">
          <div className="twsbtt-label">
            <span className="twsbtt-label-text">Position</span>
          </div>
          <select
            value={isRight}
            onChange={handlePositionToggle}
            className="twsbtt-select twsbtt-select-bordered twsbtt-select-sm"
          >
            <option value={false}>Left Side</option>
            <option value={true}>Right Side</option>
          </select>
        </label>
        {isRight ? (
          <label className="twsbtt-form-control twsbtt-w-full">
            <div className="twsbtt-label">
              <span className="twsbtt-label-text">
                Right <small>(px)</small>
              </span>
            </div>
            <input
              type="number"
              name="right"
              value={settings.right || 20}
              onChange={handleInputChange}
              placeholder="Right"
              className="twsbtt-input twsbtt-input-bordered twsbtt-w-full twsbtt-input-sm"
            />
          </label>
        ) : (
          <label className="twsbtt-form-control twsbtt-w-full">
            <div className="twsbtt-label">
              <span className="twsbtt-label-text">
                Left <small>(px)</small>
              </span>
            </div>
            <input
              type="number"
              name="left"
              value={settings.left || 20}
              onChange={handleInputChange}
              placeholder="Left"
              className="twsbtt-input twsbtt-input-bordered twsbtt-w-full twsbtt-input-sm"
            />
          </label>
        )}

        <label className="twsbtt-form-control twsbtt-w-full">
          <div className="twsbtt-label">
            <span className="twsbtt-label-text">
              Bottom <small>(px)</small>
            </span>
          </div>
          <input
            type="number"
            name="bottom"
            value={settings.bottom || 20}
            onChange={handleInputChange}
            placeholder="Bottom"
            className="twsbtt-input twsbtt-input-bordered twsbtt-w-full twsbtt-input-sm"
          />
        </label>
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

export default Positioning;
