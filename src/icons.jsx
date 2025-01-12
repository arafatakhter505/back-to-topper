// Import React icons dynamically based on a consistent naming pattern
// import * as ArrowIcons from "../assets/images"; // Import SVGs as React components using svgr plugin
import { ReactComponent as Arrow1 } from "../assets/images/arrow-1.svg";
import { ReactComponent as Arrow2 } from "../assets/images/arrow-2.svg";
import { ReactComponent as Arrow3 } from "../assets/images/arrow-3.svg";
import { ReactComponent as Arrow4 } from "../assets/images/arrow-4.svg";
import { ReactComponent as Arrow5 } from "../assets/images/arrow-5.svg";
import { ReactComponent as Arrow6 } from "../assets/images/arrow-6.svg";
import { ReactComponent as Arrow7 } from "../assets/images/arrow-7.svg";
import { ReactComponent as Arrow8 } from "../assets/images/arrow-8.svg";
import { ReactComponent as Arrow9 } from "../assets/images/arrow-9.svg";
import { ReactComponent as Arrow10 } from "../assets/images/arrow-10.svg";
import { ReactComponent as Arrow11 } from "../assets/images/arrow-11.svg";
import { ReactComponent as Arrow12 } from "../assets/images/arrow-12.svg";
import { ReactComponent as Arrow13 } from "../assets/images/arrow-13.svg";
import { ReactComponent as Arrow14 } from "../assets/images/arrow-14.svg";
import { ReactComponent as Arrow15 } from "../assets/images/arrow-15.svg";
import { ReactComponent as Arrow16 } from "../assets/images/arrow-16.svg";
import { ReactComponent as Arrow17 } from "../assets/images/arrow-17.svg";

const ArrowIcons = {
  Arrow1,
  Arrow2,
  Arrow3,
  Arrow4,
  Arrow5,
  Arrow6,
  Arrow7,
  Arrow8,
  Arrow9,
  Arrow10,
  Arrow11,
  Arrow12,
  Arrow13,
  Arrow14,
  Arrow15,
  Arrow16,
  Arrow17,
};

/**
 * Array of arrow icon objects with their corresponding file names.
 * @returns {Array} Array of icon objects containing `src` and `icon` properties
 */
const icons = Array.from({ length: 17 }, (_, index) => {
  const iconName = `Arrow${index + 1}`;
  const IconComponent = ArrowIcons[iconName];

  return {
    src: `/assets/images/arrow-${index + 1}.svg`,
    icon: IconComponent ? <IconComponent /> : null,
  };
});

export default icons;
