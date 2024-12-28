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
      className="twsbtt-space-y-5"
    >
      <div className="twsbtt-flex twsbtt-flex-row twsbtt-items-center twsbtt-gap-5 twsbtt-flex-wrap">
        {/* Button Width */}
        <FormField
          name="width"
          label="Button Width"
          value={settings.width}
          handleInputChange={handleInputChange}
          placeholder="Button Width"
        />

        {/* Button Height */}
        <FormField
          name="height"
          label="Button Height"
          value={settings.height}
          handleInputChange={handleInputChange}
          placeholder="Button Height"
        />

        {/* Border Radius */}
        <FormField
          name="borderRadius"
          label="Border Radius"
          value={settings.borderRadius}
          handleInputChange={handleInputChange}
          placeholder="Border Radius"
        />

        {/* Hover Border Radius */}
        <FormField
          name="hoverBorderRadius"
          label="Hover Border Radius"
          value={settings.hoverBorderRadius}
          handleInputChange={handleInputChange}
          placeholder="Hover Border Radius"
        />

        {/* Padding Fields */}
        <FormField
          name="paddingTop"
          label="Padding Top"
          value={settings.paddingTop}
          handleInputChange={handleInputChange}
          placeholder="Padding Top"
        />
        <FormField
          name="paddingBottom"
          label="Padding Bottom"
          value={settings.paddingBottom}
          handleInputChange={handleInputChange}
          placeholder="Padding Bottom"
        />
        <FormField
          name="paddingLeft"
          label="Padding Left"
          value={settings.paddingLeft}
          handleInputChange={handleInputChange}
          placeholder="Padding Left"
        />
        <FormField
          name="paddingRight"
          label="Padding Right"
          value={settings.paddingRight}
          handleInputChange={handleInputChange}
          placeholder="Padding Right"
        />
        <label className="twsbtt-form-control twsbtt-w-full twsbtt-max-w-xs">
          <div className="twsbtt-label">
            <span className="twsbtt-label-text">
              Button Opacity <small>(%)</small>
            </span>
          </div>
          <input
            type="number"
            name="buttonOpacity"
            value={settings.buttonOpacity}
            onChange={handleInputChange}
            placeholder="Button Opacity"
            className="twsbtt-input twsbtt-input-bordered twsbtt-w-full twsbtt-input-sm"
            min={0}
            max={100}
          />
        </label>
      </div>

      {/* Color Pickers for Icon and Background Colors */}
      <div className="twsbtt-flex twsbtt-flex-row twsbtt-items-center twsbtt-gap-5 twsbtt-flex-wrap">
        <ColorPicker
          name="iconColor"
          label="Icon Color"
          value={settings.iconColor || "#fff"}
          handleInputChange={handleInputChange}
        />
        <ColorPicker
          name="hoverIconColor"
          label="Hover Icon Color"
          value={settings.hoverIconColor || "#fff"}
          handleInputChange={handleInputChange}
        />
        <ColorPicker
          name="bgColor"
          label="Background Color"
          value={settings.bgColor || "#004CFF"}
          handleInputChange={handleInputChange}
        />
        <ColorPicker
          name="hoverBgColor"
          label="Hover Background Color"
          value={settings.hoverBgColor || "#000000"}
          handleInputChange={handleInputChange}
        />
        <ColorPicker
          name="progressColor"
          label="Progress Color"
          value={settings.progressColor || "#454545"}
          handleInputChange={handleInputChange}
        />
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

/**
 * Reusable form field for number input fields
 */
const FormField = ({ name, label, value, handleInputChange, placeholder }) => (
  <label className="twsbtt-form-control twsbtt-w-full twsbtt-max-w-xs">
    <div className="twsbtt-label">
      <span className="twsbtt-label-text">
        {label} <small>(px)</small>
      </span>
    </div>
    <input
      type="number"
      name={name}
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      className="twsbtt-input twsbtt-input-bordered twsbtt-w-full twsbtt-input-sm"
    />
  </label>
);

/**
 * Reusable color picker component
 */
const ColorPicker = ({ name, label, value, handleInputChange }) => (
  <label className="twsbtt-form-control twsbtt-flex twsbtt-flex-row-reverse twsbtt-items-center twsbtt-gap-1 twsbtt-border twsbtt-rounded twsbtt-h-[35px] twsbtt-p-1">
    <div className="twsbtt-label">
      <span className="twsbtt-label-text">{label}</span>
    </div>
    <input
      type="color"
      name={name}
      value={value}
      onChange={handleInputChange}
      className="!twsbtt-border-0 twsbtt-p-0 twsbtt-w-[40px] twsbtt-input-sm"
    />
  </label>
);

export default ButtonAppearance;
