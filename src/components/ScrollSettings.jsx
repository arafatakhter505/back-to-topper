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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-row items-center gap-5">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Scroll Duration (ms)</span>
          </div>
          <input
            type="number"
            name="scrollDuration"
            value={settings.scrollDuration || 0}
            onChange={handleInputChange}
            placeholder="Scroll Duration (ms)"
            className="input input-bordered w-full max-w-xs input-sm"
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
        className={`btn btn-success text-white w-[100px] btn-sm`}
        disabled={isLoading} // Disable the button when loading
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default ScrollSettings;
