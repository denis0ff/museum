function beforeAfterSlider() {
  const clipbox = document.querySelector(".explore-slider-container");
const dragger = document.querySelector(".explore-slider-container .explore-picture-delimeter");
const first   = document.querySelector(".explore-slider-container .explore-picture-overlay");

let drag = false;

const draggerWidth = dragger.getBoundingClientRect().width;

const clipboxDimensions = {
	width: clipbox.getBoundingClientRect().width,
	left: clipbox.getBoundingClientRect().left
};

const handleStartDrag = () => {
	drag = true;
	dragger.classList.add("delimeter--active");
	dragger.style.pointerEvents = "none";
};

const handleStopDrag = () => {
	drag = false;
	dragger.style.pointerEvents = "auto";
	dragger.classList.remove("delimeter--active");	
	clipbox.style.cursor = "auto";
};

const handleImgReveal = e => {
	e.preventDefault();
	e.offsetX = e.offsetX || e.targetTouches[0].pageX - clipboxDimensions.left;
	if(drag && e.offsetX < clipboxDimensions.width && e.offsetX > 0) {
		clipbox.style.cursor = "ew-resize";
		dragger.style.left = e.offsetX - draggerWidth / 2 + "px";
		first.style.width = e.offsetX + "px";
	}
};

dragger.addEventListener("mousedown", handleStartDrag);
dragger.addEventListener("touchstart", handleStartDrag);

clipbox.addEventListener("mouseup", handleStopDrag);
clipbox.addEventListener("touchend", handleStopDrag);

clipbox.addEventListener("mousemove", handleImgReveal);
clipbox.addEventListener("touchmove", handleImgReveal);
}

beforeAfterSlider()