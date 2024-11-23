import React from "react";
import { toast } from "react-toastify";

const ButtonAppearance = ({ settings, handleChange }) => {
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
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 flex-wrap">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Button Width (px)</span>
          </div>
          <input
            type="number"
            name="width"
            value={settings.width || 0}
            onChange={handleChange}
            placeholder="Button Width"
            className="input input-bordered w-full input-sm"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Button Height (px)</span>
          </div>
          <input
            type="number"
            name="height"
            value={settings.height || 0}
            onChange={handleChange}
            placeholder="Button Height"
            className="input input-bordered w-full input-sm"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Button Opacity</span>
          </div>
          <input
            type="number"
            name="opacity"
            value={settings.opacity || 0}
            onChange={handleChange}
            placeholder="Button Opacity"
            className="input input-bordered w-full input-sm"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Button Fade Duration (ms)</span>
          </div>
          <input
            type="number"
            name="fadeDuration"
            value={settings.fadeDuration || 0}
            onChange={handleChange}
            placeholder="Button Fade Duration (ms)"
            className="input input-bordered w-full input-sm"
          />
        </label>
      </div>
      <div className="flex flex-row items-center gap-5 flex-wrap">
        <label className="form-control flex flex-row-reverse items-center gap-1 border rounded h-[35px] p-1">
          <div className="label">
            <span className="label-text">Text Color</span>
          </div>
          <input
            type="color"
            name="textColor"
            value={settings.textColor || "#000"}
            onChange={handleChange}
            placeholder="Text Color"
            className="!border-0 p-0 w-[40px] input-sm"
          />
        </label>
        <label className="form-control flex flex-row-reverse items-center gap-1 border rounded h-[35px] p-1">
          <div className="label">
            <span className="label-text">Background Color</span>
          </div>
          <input
            type="color"
            name="bgColor"
            value={settings.bgColor || "#000"}
            onChange={handleChange}
            placeholder="Background Color"
            className="!border-0 p-0 w-[40px] input-sm"
          />
        </label>
        <label className="form-control flex flex-row-reverse items-center gap-1 border rounded h-[35px] p-1">
          <div className="label">
            <span className="label-text">Hover Text Color</span>
          </div>
          <input
            type="color"
            name="hoverTextColor"
            value={settings.hoverTextColor || "#000"}
            onChange={handleChange}
            placeholder="Text Color"
            className="!border-0 p-0 w-[40px] input-sm"
          />
        </label>
        <label className="form-control flex flex-row-reverse items-center gap-1 border rounded h-[35px] p-1">
          <div className="label">
            <span className="label-text">Hover Background Color</span>
          </div>
          <input
            type="color"
            name="hoverBgColor"
            value={settings.hoverBgColor || "#000"}
            onChange={handleChange}
            placeholder="Background Color"
            className="!border-0 p-0 w-[40px] input-sm"
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

export default ButtonAppearance;
