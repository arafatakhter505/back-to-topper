import React, { useState } from "react";
import { toast } from "react-toastify";

/**
 * Handles form submission and saves settings via API request
 */
const handleSubmit = async (e, settings, setIsLoading) => {
  e.preventDefault();
  setIsLoading(true);

  const nonce = window.backToTopperSettings.nonce;

  try {
    const response = await fetch(window.backToTopperSettings.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": nonce, // Adding nonce for authentication
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

/**
 * ButtonAppearance component for handling button style settings
 */
const ButtonAppearance = ({ settings, handleInputChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      onSubmit={(e) => handleSubmit(e, settings, setIsLoading)}
      className="space-y-5"
    >
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 flex-wrap">
        {/* Button Width */}
        <FormField
          name="width"
          label="Button Width"
          value={settings.width || 50}
          handleInputChange={handleInputChange}
          placeholder="Button Width"
        />

        {/* Button Height */}
        <FormField
          name="height"
          label="Button Height"
          value={settings.height || 50}
          handleInputChange={handleInputChange}
          placeholder="Button Height"
        />

        {/* Border Radius */}
        <FormField
          name="borderRadius"
          label="Border Radius"
          value={settings.borderRadius || 15}
          handleInputChange={handleInputChange}
          placeholder="Border Radius"
        />

        {/* Hover Border Radius */}
        <FormField
          name="hoverBorderRadius"
          label="Hover Border Radius"
          value={settings.hoverBorderRadius || 5}
          handleInputChange={handleInputChange}
          placeholder="Hover Border Radius"
        />

        {/* Padding Fields */}
        <FormField
          name="paddingTop"
          label="Padding Top"
          value={settings.paddingTop || 10}
          handleInputChange={handleInputChange}
          placeholder="Padding Top"
        />
        <FormField
          name="paddingBottom"
          label="Padding Bottom"
          value={settings.paddingBottom || 10}
          handleInputChange={handleInputChange}
          placeholder="Padding Bottom"
        />
        <FormField
          name="paddingLeft"
          label="Padding Left"
          value={settings.paddingLeft || 10}
          handleInputChange={handleInputChange}
          placeholder="Padding Left"
        />
        <FormField
          name="paddingRight"
          label="Padding Right"
          value={settings.paddingRight || 10}
          handleInputChange={handleInputChange}
          placeholder="Padding Right"
        />
      </div>

      {/* Color Pickers for Icon and Background Colors */}
      <div className="flex flex-row items-center gap-5 flex-wrap">
        <ColorPicker
          name="iconColor"
          label="Icon Color"
          value={settings.iconColor || "#fff"}
          handleInputChange={handleInputChange}
        />
        <ColorPicker
          name="hoverIconColor"
          label="Hover Icon Color"
          value={settings.hoverIconColor || "#000"}
          handleInputChange={handleInputChange}
        />
        <ColorPicker
          name="bgColor"
          label="Background Color"
          value={settings.bgColor || "#000"}
          handleInputChange={handleInputChange}
        />
        <ColorPicker
          name="hoverBgColor"
          label="Hover Background Color"
          value={settings.hoverBgColor || "#000"}
          handleInputChange={handleInputChange}
        />
      </div>
      <button
        type="submit"
        className={`btn btn-success text-white w-[100px] btn-sm`}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

/**
 * Reusable form field for number input fields
 */
const FormField = ({ name, label, value, handleInputChange, placeholder }) => (
  <label className="form-control w-full">
    <div className="label">
      <span className="label-text">
        {label} <small>(px)</small>
      </span>
    </div>
    <input
      type="number"
      name={name}
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      className="input input-bordered w-full input-sm"
    />
  </label>
);

/**
 * Reusable color picker component
 */
const ColorPicker = ({ name, label, value, handleInputChange }) => (
  <label className="form-control flex flex-row-reverse items-center gap-1 border rounded h-[35px] p-1">
    <div className="label">
      <span className="label-text">{label}</span>
    </div>
    <input
      type="color"
      name={name}
      value={value}
      onChange={handleInputChange}
      className="!border-0 p-0 w-[40px] input-sm"
    />
  </label>
);

export default ButtonAppearance;
