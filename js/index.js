const burgerIcon = document.querySelector('.header__burger-icon');
const burgerIconCenterLine = document.querySelector('.header__burger-icon-center');
const navigation = document.querySelector('.header__wrapper');
const headerLinks = document.querySelectorAll('.header__link');

function openMenu() {
  const burgerIconClasses = burgerIcon.getAttribute("class");
  if (burgerIconClasses.includes('open')) {
    closeMenu();
  } else {
    burgerIcon.classList.add('header__burger-icon_open')
    burgerIconCenterLine.classList.add('header__burger-icon-center_open');
    navigation.classList.add('header__wrapper_open')
  }
}

function closeMenu() {
  burgerIcon.classList.remove('header__burger-icon_open');
  burgerIconCenterLine.classList.remove('header__burger-icon-center_open');
  navigation.classList.remove('header__wrapper_open');
}

burgerIcon.addEventListener("click", () => openMenu());
[...headerLinks].forEach(element => element.addEventListener("click", () => closeMenu()));
