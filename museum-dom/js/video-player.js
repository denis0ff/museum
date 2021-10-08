// Get Elements
const player = document.querySelector(".video-container");
const video = player.querySelector(".viewer");

const bigPlayToggle = player.querySelector(".big-play-toggle");
const playToggle = player.querySelector(".play-toggle");
const soundToggle = player.querySelector(".sound-toggle");
const soundProgress = player.querySelector(".sound-progress");
const videoProgress = player.querySelector(".video-progress");
const fullScreenToggle = player.querySelector(".fullscreen-toggle");

// Functions
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function toggleSound() {
  if (video.muted) {
    video.muted = !video.muted;
    soundProgress.value = 0.05;
    video["volume"] = 0.05;
    updateSoundButton();
    soundProgressLineUpdate();
  } else {
    video.muted = !video.muted;
    soundProgress.value = 0;
    video["volume"] = 0;
    updateSoundButton();
    soundProgressLineUpdate();
  }
}

function updatePlayButtons() {
  const icon = this.paused ? "play.svg" : "pause.svg";
  playToggle.style.backgroundImage = `url(./assets/svg/video/${icon})`;
  this.paused
    ? (bigPlayToggle.style.display = `block`)
    : (bigPlayToggle.style.display = "none");
}

function updateSoundButton() {
  const icon = !video.muted ? "volume.svg" : "volume-mute.svg";
  soundToggle.style.backgroundImage = `url(./assets/svg/video/${icon})`;
}

function handleSoundProgressUpdate() {
  video[this.name] = this.value;
  if (this.value < 0.05) {
    video.muted = true;
    updateSoundButton();
  } else {
    video.muted = false;
    updateSoundButton();
  }
}

function handleVideoProgressUpdate() {
  video[this.name] = (this.value * video.duration) / 100;
}

function autoVideoProgressUpdate() {
  videoProgress.value = (video.currentTime / video.duration) * 100;
  videoProgressLineUpdate();
}

function videoProgressLineUpdate() {
  videoProgress.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${videoProgress.value}%, #C4C4C4 ${videoProgress.value}%, #C4C4C4 100%)`;
}
function soundProgressLineUpdate() {
  const value = soundProgress.value * 100;
  soundProgress.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}

function fullScreenChange() {
  if (!document.fullscreenElement) player.requestFullscreen();
  else if (document.fullscreenEnabled) document.exitFullscreen();
}

function keyboardShortcuts(e) {
  e.preventDefault();
  const code = e.code;
  const key = e.key
  switch (code) {
    case "KeyF":
      fullScreenChange();
      break;
    case "KeyM":
      toggleSound();
      break;
    case "Space":
      togglePlay();
      break;
  }
  if (key === 'Shift') {
    document.addEventListener('keydown', keyboardShiftPlusShortcuts)
  }
}

function keyboardShiftPlusShortcuts(e) {
  const code = e.code;
  if (code === 'Comma') {
    video.playbackRate < 16 ? video.playbackRate += 0.25 : video.playbackRate
  } else if (code === 'Period') {
    video.playbackRate > 0.25 ? video.playbackRate -= 0.25 : video.playbackRate
  }
}
// Hook up events

video.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButtons);
video.addEventListener("pause", updatePlayButtons);
video.addEventListener("timeupdate", autoVideoProgressUpdate);

soundToggle.addEventListener("click", updateSoundButton);
soundToggle.addEventListener("click", toggleSound);
playToggle.addEventListener("click", togglePlay);
bigPlayToggle.addEventListener("click", togglePlay);
soundProgress.addEventListener("change", handleSoundProgressUpdate);
soundProgress.addEventListener("mousemove", handleSoundProgressUpdate);
soundProgress.addEventListener("input", soundProgressLineUpdate);
videoProgress.addEventListener("input", videoProgressLineUpdate);
videoProgress.addEventListener("change", handleVideoProgressUpdate);
videoProgress.addEventListener("mousemove", handleVideoProgressUpdate);

fullScreenToggle.addEventListener("click", fullScreenChange);

document.addEventListener("keydown", keyboardShortcuts);