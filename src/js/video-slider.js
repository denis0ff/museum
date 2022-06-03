// Get Elements

const sliderVideo = document.getElementById("video-slider");
const bullets = sliderVideo.querySelectorAll(".player-item");
const buttons = sliderVideo.querySelectorAll(".slider__control");
const ytVideos = sliderVideo.querySelectorAll('.yt-frame')
const videoWrappers = sliderVideo.querySelectorAll('.video-slider-item')

// Functions

function updateMainVideoByBullets() {
  video.src = `./assets/video/video${this.dataset.slideTo}.mp4`;
  video.poster = `./assets/video/poster${this.dataset.slideTo}.webp`;
  resetVideo();
  stopYtVideos()
}

function updateMainVideoByButtons() {
  let index;
  const active = sliderVideo.querySelector(".player-item.active");
  if (this.classList.contains("player-left")) {
    active.dataset.slideTo == 0
      ? (index = 4)
      : (index = active.dataset.slideTo - 1);
  }
  if (this.classList.contains("player-right")) {
    active.dataset.slideTo == 4
      ? (index = 0)
      : (index = +active.dataset.slideTo + 1);
  }
  video.src = `./assets/video/video${index}.mp4`;
  video.poster = `./assets/video/poster${index}.webp`;
  stopYtVideos()
  resetVideo();
}

function resetVideo() {
  videoProgress.value = 0;
  updatePlayButtons();
  videoProgressLineUpdate();
}

function stopYtVideos() {
  for (let ytp of ytVideos) {
    ytp.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
  }
}

// Hook up events

bullets.forEach((handler) =>
  handler.addEventListener("click", updateMainVideoByBullets)
);

buttons.forEach((handler) =>
  handler.addEventListener("click", updateMainVideoByButtons)
);

videoWrappers.forEach((handler) =>
  handler.addEventListener("click", stopYtVideos)
);
