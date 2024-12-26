import React, { useState } from "react";
import { toast } from "react-toastify";

const ScrollSettings = ({ settings, handleInputChange }) => {
  const [isLoading, setIsLoading] = useState(false);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="twsbtt-space-y-5">
      <div className="twsbtt-flex twsbtt-flex-row twsbtt-items-center twsbtt-gap-5">
        <label className="twsbtt-form-control twsbtt-w-full twsbtt-max-w-xs">
          <div className="twsbtt-label">
            <span className="twsbtt-label-text">
              Scroll Duration <small>(ms)</small>
            </span>
          </div>
          <input
            type="number"
            name="scrollDuration"
            value={settings.scrollDuration}
            onChange={handleInputChange}
            placeholder="Scroll Duration (ms)"
            className="twsbtt-input twsbtt-input-bordered twsbtt-w-full twsbtt-max-w-xs twsbtt-input-sm"
            aria-label="Scroll Duration"
            min="0"
          />
        </label>
        <label className="twsbtt-form-control twsbtt-w-full twsbtt-max-w-xs">
          <div className="twsbtt-label">
            <span className="twsbtt-label-text">
              Scroll Offset <small>(px)</small>
            </span>
          </div>
          <input
            type="number"
            name="scrollOffset"
            value={settings.scrollOffset}
            onChange={handleInputChange}
            placeholder="Scroll Offset (px)"
            className="twsbtt-input twsbtt-input-bordered twsbtt-w-full twsbtt-max-w-xs twsbtt-input-sm"
            aria-label="Scroll Offset"
            min="0"
          />
        </label>
      </div>

      <button
        type="submit"
        className={`twsbtt-btn twsbtt-btn-success twsbtt-text-white twsbtt-w-[100px] twsbtt-btn-sm`}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default ScrollSettings;
