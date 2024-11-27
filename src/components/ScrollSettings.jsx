import React from "react";
import { toast } from "react-toastify";

const ScrollSettings = ({ settings, handleChange }) => {
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
      <div className="flex flex-row items-center gap-5">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Scroll Duration (ms)</span>
          </div>
          <input
            type="number"
            name="scrollDuration"
            value={settings.scrollDuration || 0}
            onChange={handleChange}
            placeholder="Scroll Duration (ms)"
            className="input input-bordered w-full max-w-xs input-sm"
          />
        </label>
      </div>
      {/* <label className="label cursor-pointer flex gap-2 w-[160px]">
        <input
          type="checkbox"
          name="calculation"
          checked={settings.calculation || false}
          onChange={handleChange}
        />
        <span className="label-text">Calculation Enabled</span>
      </label> */}
      <button
        type="submit"
        className="btn btn-success text-white w-[100px] btn-sm"
      >
        Save
      </button>
    </form>
  );
};

export default ScrollSettings;
