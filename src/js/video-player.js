// Get Elements
const player = document.querySelector(".video-container");
const video = player.querySelector(".viewer");

const bigPlayToggle = player.querySelector(".big-play-toggle");
const playToggle = player.querySelector(".play-toggle");
const soundToggle = player.querySelector(".sound-toggle");
const soundProgress = player.querySelector(".sound-progress");
const videoProgress = player.querySelector(".video-progress");
const fullScreenToggle = player.querySelector(".fullscreen-toggle");
const rate = player.querySelector(".playbackRate");

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
  const icon = video.paused ? "play.svg" : "pause.svg";
  playToggle.style.backgroundImage = `url(./assets/svg/video/${icon})`;
  video.paused
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
  if(isNaN(video.duration)) return
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

function preventStandardHotKeyActions(event) {
  event.stopPropagation();
  event.preventDefault();
}

function keyboardShortcuts(e) {
  e.stopPropagation();
  e.preventDefault();
  const code = e.code;
  const key = e.key;
  let action;
  switch (code) {
    case "KeyF":
      action = fullScreenChange();
      break;
    case "KeyM":
      action = toggleSound();
      break;
    case "Space":
      action = togglePlay();
      break;
  }
  if (
    action &&
    pressedKey !== "Control" &&
    pressedKey !== "Alt" &&
    pressedKey !== "Shift"
  ) {
    action();
    preventStandardHotKeyActions(e); //Stops the default key behaviour like jumping the page with space.
  }
  if (key === "Shift") {
    document.addEventListener("keydown", keyboardShiftPlusShortcuts);
  }
}

var to;
function keyboardShiftPlusShortcuts(e) {
  const code = e.code;
  if (code === "Comma") {
    video.playbackRate < 16 ? (video.playbackRate += 0.25) : video.playbackRate;
  } else if (code === "Period") {
    video.playbackRate > 0.25
      ? (video.playbackRate -= 0.25)
      : video.playbackRate;
  }
  rate.innerHTML = "x" + video.playbackRate;
  rate.style.display = "flex";
  if (to) {
    clearTimeout(to)
  }
  to = setTimeout(() => (rate.style.display = "none"), 2000);
}


function playerFocused() {
  if (player.contains(document.activeElement)) {
    document.addEventListener("keydown", keyboardShortcuts);
  } else {
    document.removeEventListener("keydown", keyboardShortcuts);
  }
}

function enableShortcuts() {
  document.addEventListener("focus", playerFocused, true);
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
document.addEventListener("DOMContentLoaded", enableShortcuts);
