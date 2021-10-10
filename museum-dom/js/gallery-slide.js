function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    var context = this, agrs = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, agrs);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');
  
function slideImages(e) {
  // What part of the content is visible in the window?
  const windowTop = window.scrollY + 2 * window.innerHeight;
  const windowCenter = window.scrollY + 1.5 * window.innerHeight;

  sliderImages.forEach(function(image) {
    const imageTop = image.getBoundingClientRect().top + window.scrollY;
    const imageBottom = image.getBoundingClientRect().bottom + window.scrollY;
    if (imageTop <= windowCenter) {
      image.classList.add('active');
    }
    if (imageBottom > windowTop) {
      image.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(slideImages))