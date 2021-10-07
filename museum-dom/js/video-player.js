// Get Elements
const player = document.querySelector(".video-container");
const video = player.querySelector(".viewer");

const bigPlayToggle = player.querySelector(".big-play-toggle");
const playToggle = player.querySelector(".play-toggle");
const soundToggle = player.querySelector(".sound-toggle");
const soundProgress = player.querySelector(".sound-progress");
const videoProgress = player.querySelector(".video-progress");
const fullScreenToggle = player.querySelector('.fullscreen-toggle')

// Functions
function togglePlay() {
  // const method = video.paused ? 'play' : 'pause';
  // video[method]();
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
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

function videoProgressLineUpdate() {
  this.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${this.value}%, #C4C4C4 ${this.value}%, #C4C4C4 100%)`;
}
function soundProgressLineUpdate() {
  const value = soundProgress.value * 100;
  soundProgress.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}

function fullScreenChange() {
  console.log(player.fullScreenElement);
  !player.fullScreenElement ? document.fullScreenCancel() : player.requestFullscreen() ;
}

// Hook up events

video.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButtons);
video.addEventListener("pause", updatePlayButtons);

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

fullScreenToggle.addEventListener('click', fullScreenChange)
