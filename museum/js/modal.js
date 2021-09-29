function modalActivity() {
  const modal = document.getElementById("booking");
  const overlay = document.getElementsByClassName("modal-overlay")[0];
  const btn = document.getElementById("buyNow");
  const span = document.getElementsByClassName("modal-close")[0];
  const ANIMATION_SPEED = 500;
  let closing = true;

  btn.onclick = function () {
    modal.classList.add("open");
  };

  span.onclick = function () {
    modal.classList.remove("open");
    closing = false;
  };

  window.onclick = function (event) {
    if (event.target == overlay || event.target == span) {
      closing = true;
      modal.classList.remove("open");
      modal.classList.add("hide");
      setTimeout(() => {
        modal.classList.remove("hide");
        closing = false;
      }, ANIMATION_SPEED);
    }
  };
}
modalActivity();
