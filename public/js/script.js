// Constants for better readability and maintainability
const SCROLL_THRESHOLD = 200;
const SMALL_DEVICE_WIDTH = 768;

// Get the scroll-to-top button and settings
const scrollToTopBtn = document.getElementById("twsbttScrollToTopBtn");
const { enabled, hideSmallDevice, autoHide, scrollDuration } =
  backToTopperSettings.settings;

// Check if the functionality is enabled
if (enabled) {
  // Initialize scroll event listener
  window.onscroll = handleScroll;

  // Initialize click event listener
  scrollToTopBtn.addEventListener("click", scrollToTop);
}

/**
 * Handle the scroll event to toggle the visibility of the button.
 */
function handleScroll() {
  // If the device is small and hideSmallDevice is enabled, hide the button
  if (shouldHideButtonOnSmallDevice()) {
    scrollToTopBtn.style.display = "none";
    return;
  }

  // Show or hide the button based on scroll position and settings
  if (autoHide) {
    toggleButtonVisibilityBasedOnScroll();
  } else {
    scrollToTopBtn.style.display = "block";
  }
}

/**
 * Determine if the button should be hidden on small devices.
 */
function shouldHideButtonOnSmallDevice() {
  return hideSmallDevice && window.innerWidth <= SMALL_DEVICE_WIDTH;
}

/**
 * Toggle the visibility of the scroll-to-top button based on scroll position.
 */
function toggleButtonVisibilityBasedOnScroll() {
  const shouldShowButton =
    document.body.scrollTop > SCROLL_THRESHOLD ||
    document.documentElement.scrollTop > SCROLL_THRESHOLD;

  scrollToTopBtn.style.display = shouldShowButton ? "block" : "none";
}

/**
 * Scroll the document to the top smoothly with a custom duration.
 */
function scrollToTop() {
  const startScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  const startTime = performance.now();

  function scrollStep(timestamp) {
    const elapsedTime = timestamp - startTime;
    const progress = Math.min(elapsedTime / scrollDuration, 1); // Ensure progress doesn't exceed 1

    const scrollTo = startScroll * (1 - progress); // Scroll to the top without offset
    window.scrollTo(0, scrollTo);

    if (progress < 1) {
      requestAnimationFrame(scrollStep); // Continue scrolling
    }
  }

  // Start the scroll animation
  requestAnimationFrame(scrollStep);
}
