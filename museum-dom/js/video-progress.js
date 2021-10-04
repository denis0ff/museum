function progressControl() {
  const videoProgress = document.querySelector(".video-progress");
  const soundProgress = document.querySelector(".sound-progress");
  videoProgress.addEventListener("input", function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  });
  soundProgress.addEventListener("input", function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  });
}

progressControl();
