(function () {
  function trackScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add("back-to-top-show");
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove("back-to-top-show");
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const goTopBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", trackScroll);
  goTopBtn.addEventListener("click", backToTop);
})();
