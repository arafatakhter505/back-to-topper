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
      console.error("Error during settings save:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="twsbtt-space-y-5">
      <div className="twsbtt-flex twsbtt-flex-row twsbtt-items-center twsbtt-gap-5">
        <label className="twsbtt-form-control twsbtt-w-full twsbtt-max-w-xs">
          <div className="twsbtt-label">
            <span className="twsbtt-label-text">Scroll Duration (ms)</span>
          </div>
          <input
            type="number"
            name="scrollDuration"
            value={settings.scrollDuration || 0}
            onChange={handleInputChange}
            placeholder="Scroll Duration (ms)"
            className="twsbtt-input twsbtt-input-bordered twsbtt-w-full twsbtt-max-w-xs twsbtt-input-sm"
            aria-label="Scroll Duration"
            min="0"
          />
        </label>
      </div>

      {/* Uncomment this part if needed */}
      {/* <label className="label cursor-pointer flex gap-2 w-[160px]">
        <input
          type="checkbox"
          name="calculation"
          checked={settings.calculation || false}
          onChange={handleInputChange}
        />
        <span className="label-text">Calculation Enabled</span>
      </label> */}

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

export default ScrollSettings;
