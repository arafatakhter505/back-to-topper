import React from "react";
import icons from "../icons";

const Preview = ({ settings }) => {
  return (
    <div
      style={{
        zIndex: 9999,
        backgroundColor: settings.progressColor,
        width: `${settings.width}px`,
        height: `${settings.height}px`,
        borderRadius: `${settings.borderRadius}px`,
        left: `${settings.left}px`,
        right: `${settings.right}px`,
        bottom: `${settings.bottom}px`,
        opacity: settings.buttonOpacity + "%",
        transition: "border-radius 0.3s ease",
      }}
      className="twsbtt-fixed twsbtt-cursor-pointer twsbtt-flex twsbtt-justify-center twsbtt-items-center twsbtt-overflow-hidden"
    >
      <div
        style={{
          backgroundColor: settings.bgColor,
          borderRadius: `${settings.borderRadius}px`,
          paddingTop: `${settings.paddingTop}px`,
          paddingBottom: `${settings.paddingBottom}px`,
          paddingLeft: `${settings.paddingLeft}px`,
          paddingRight: `${settings.paddingRight}px`,
          opacity: settings.buttonOpacity + "%",
          transition: "border-radius 0.3s ease, background-color 0.3s ease",
        }}
        className={`twsbtt-w-[calc(100%-7px)] twsbtt-h-[calc(100%-7px)] twsbtt-flex twsbtt-justify-center twsbtt-items-center twsbtt-cursor-pointer`}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderRadius = `${settings.hoverBorderRadius}px`;
          e.currentTarget.style.backgroundColor = settings.hoverBgColor;
          e.currentTarget.parentNode.style.borderRadius = `${settings.hoverBorderRadius}px`;
          e.currentTarget.querySelector("svg").style.fill =
            settings.hoverIconColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderRadius = `${settings.borderRadius}px`;
          e.currentTarget.style.backgroundColor = settings.bgColor;
          e.currentTarget.parentNode.style.borderRadius = `${settings.borderRadius}px`;
          e.currentTarget.querySelector("svg").style.fill = settings.iconColor;
        }}
      >
        <svg
          style={{
            fill: settings.iconColor,
            transition: "fill 0.3s ease",
          }}
        >
          {icons?.find((item) => item.src === settings.icon)?.icon}
        </svg>
      </div>
    </div>
  );
};

export default Preview;
