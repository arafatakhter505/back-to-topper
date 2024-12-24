// Import React icons dynamically based on a consistent naming pattern
import * as ArrowIcons from "../assets/images";

/**
 * Array of arrow icon components with their corresponding file names.
 * This dynamically imports icons based on a consistent naming scheme.
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
