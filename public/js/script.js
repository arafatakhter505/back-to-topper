// Get the button
const scrollToTopBtn = document.getElementById("twsbttScrollToTopBtn");

// Show the button when scrolling down 200px from the top of the document
window.onscroll = function () {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// When the user clicks the button, scroll to the top of the document
scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
