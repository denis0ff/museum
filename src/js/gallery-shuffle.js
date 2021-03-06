function shuffle() {
  const galleryColumns = document.querySelectorAll(".gallery-column");
  let images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(
    () => Math.random() - 0.5
  );
  let i = 0;
  let addInColumn = "";
  for (let column of galleryColumns) {
    while (i < 15) {
      addInColumn += `<img class="gallery-picture align-bottom slide-in" src="assets/img/galery/galery${images[i]}.webp" alt="picture ${images[i]}">`;
      i++;
      if (!(i % 5)) break;
    }
    column.innerHTML = addInColumn;
    addInColumn = "";
  }
}
shuffle();

