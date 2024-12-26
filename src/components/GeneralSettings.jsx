import React, { useEffect, useState } from "react";
import Select from "react-select";
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
const GeneralSettings = ({
  settings,
  wpPages,
  wpPosts,
  handleInputChange,
  setSettings,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    wpPages.forEach((page) => {
      setPages((prev) => [...prev, { value: page.ID, label: page.post_title }]);
    });

    wpPosts.forEach((post) => {
      setPosts((prev) => [...prev, { value: post.ID, label: post.post_title }]);
    });
  }, [wpPages, wpPosts]);

  const handlePageSelectChange = (e) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      excludePages: e,
    }));
  };

  const handlePostSelectChange = (e) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      excludePosts: e,
    }));
  };

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="twsbtt-space-y-5 twsbtt-general-settings"
    >
      <div className="twsbtt-form-control twsbtt-flex twsbtt-flex-row twsbtt-items-center twsbtt-gap-5">
        <CheckboxInput
          name="enabled"
          label="Enabled"
          checked={settings.enabled}
          onChange={handleInputChange}
        />
        <CheckboxInput
          name="autoHide"
          label="Auto Hide"
          checked={settings.autoHide}
          onChange={handleInputChange}
        />
        <CheckboxInput
          name="hideSmallDevice"
          label="Hide On Small Device"
          checked={settings.hideSmallDevice}
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
      <div className="twsbtt-flex twsbtt-items-center twsbtt-gap-5">
        <label className="twsbtt-form-control twsbtt-w-full twsbtt-max-w-xs">
          <div className="twsbtt-label">
            <span className="twsbtt-label-text">Exclude Pages</span>
          </div>
          <Select
            isMulti
            name="excludePages"
            options={pages}
            value={settings.excludePages}
            onChange={handlePageSelectChange}
          />
        </label>
        <label className="twsbtt-form-control twsbtt-w-full twsbtt-max-w-xs">
          <div className="twsbtt-label">
            <span className="twsbtt-label-text">Exclude Posts</span>
          </div>
          <Select
            isMulti
            name="excludePosts"
            options={posts}
            value={settings.excludePosts}
            onChange={handlePostSelectChange}
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

export default GeneralSettings;
