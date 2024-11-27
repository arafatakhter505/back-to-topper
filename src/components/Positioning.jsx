import React, { useState } from "react";
import { toast } from "react-toastify";

const Positioning = ({ settings, handleChange, setSettings }) => {
  const [isRight, setIsRight] = useState(settings.right !== "");

  // Handle Position changes
  const handlePositionChange = (e) => {
    if (isRight) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        bottom: 20,
        right: "",
        left: 20,
      }));
      setIsRight(!isRight);
    } else {
      setSettings((prevSettings) => ({
        ...prevSettings,
        bottom: 20,
        right: 20,
        left: "",
      }));
      setIsRight(!isRight);
    }
  };

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
      <div className="flex justify-center items-center gap-5 pt-5 text-xl">
        <span>Left</span>
        <input
          type="checkbox"
          className="!toggle !border-[#1F2937] !bg-[#1F2937] !hover:bg-[#8F949B] checked:bg-[#1F2937] checked:border-[#1F2937]"
          checked={isRight}
          onChange={handlePositionChange}
        />
        <span>Right</span>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
        {isRight ? (
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                Right <small>(px)</small>
              </span>
            </div>
            <input
              type="number"
              name="right"
              value={settings.right || 20}
              onChange={handleChange}
              placeholder="Right"
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </label>
        ) : (
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                Left <small>(px)</small>
              </span>
            </div>
            <input
              type="number"
              name="left"
              value={settings.left || 20}
              onChange={handleChange}
              placeholder="Left"
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </label>
        )}

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">
              Bottom <small>(px)</small>
            </span>
          </div>
          <input
            type="number"
            name="bottom"
            value={settings.bottom || 20}
            onChange={handleChange}
            placeholder="Bottom"
            className="input input-bordered w-full max-w-xs input-sm"
          />
        </label>
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

export default Positioning;
