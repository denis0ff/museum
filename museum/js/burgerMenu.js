function burgerMenu() {
  let menu = document.querySelector("nav.header-nav");
  let button = document.querySelector("a.burger-menu_button");
  let links = menu.querySelectorAll('li.header-list-item > a')
  let trigger = button.querySelector('span.burger-menu_lines')
  let title = document.querySelector("div.title");
  let header = document.querySelector("div.header-small");
  
  button.addEventListener("click", toggle);
  links.forEach(item => item.addEventListener("click", toggle));
  
  function toggle() {
    if (menu.classList.contains('active')) {
      menu.classList.remove('active')
      button.classList.remove("active");
      trigger.classList.remove("active");
      title.classList.remove("active");
      header.classList.remove("active");
    } else {
      menu.classList.add("active");
      button.classList.add("active");
      trigger.classList.add("active");
      title.classList.add("active");
      header.classList.add("active");
    }
  }
}
burgerMenu();
