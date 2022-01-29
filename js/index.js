const infoSlides = {
  'first': {
    'next': 'second',
    'prev': 'third',
    'title': 'Шоссе',
    'description': 'На\u00A0шоссейном велосипеде можно ездить по\u00A0асфальту на\u00A0разных градиентах: будь\u00A0то горы или равнины. Гонки проходят в\u00A0командном пелотоне, но\u00A0тренироваться можно и\u00A0самостоятельно.',
    'icon': 'slider__trapeze_icon_highway'
  },
  'second': {
    'next': 'third',
    'prev': 'first',
    'title': 'Грэвел',
    'description': 'Грэвел похож на\u00A0шоссейный велосипед, но\u00A0конструкция рамы немного отличается, и\u00A0на\u00A0нём стоят более широкие покрышки, всё для того чтобы проехать по\u00A0лёгкому бездорожью.',
    'icon': 'slider__trapeze_icon_gravel'
  },
  'third': {
    'next': 'first',
    'prev': 'second',
    'title': 'ТТ',
    'description': 'ТТ\u00A0\u2013 это велосипед для триатлона или раздельного старта, гооняют на\u00A0таком велике только по\u00A0равнинному асфальту, велик очень быстрые и\u00A0аэродинамичный.',
    'icon': 'slider__trapeze_icon_tt'
  }
}

const burgerIcon = document.querySelector('.header__burger-icon');
const burgerIconCenterLine = document.querySelector('.header__burger-icon-center');
const navigation = document.querySelector('.header__wrapper');
const headerLinks = document.querySelectorAll('.header__link');

const slider = document.querySelector('.slider');
const sliderTitle = slider.querySelector('.slider__title');
const sliderDescription = slider.querySelector('.slider__description');
const sliderCarousel = slider.querySelector('.slider__carousel');
const sliderIcon = slider.querySelector('.slider__trapeze');
const nextBtn = slider.querySelector('.slider__button_type_next');
const prevBtn = slider.querySelector('.slider__button_type_prev');


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

function getSlideInfo(action) {
  const currentSlide = slider.querySelector('.active');
  currentSlide.classList.remove('active');
  const slideId = infoSlides[currentSlide.id][action];
  const slide = slider.querySelector(`#${slideId}`);
  slide.classList.add('active');

  return infoSlides[slideId];
}

function updatePageSlideInfo(info) {
  sliderTitle.textContent = info.title;
  sliderDescription.textContent = info.description;
  const classesIcons = sliderIcon.classList;
  classesIcons.remove(classesIcons[1]);
  classesIcons.add(info.icon);
}

function changeSlidePosition(action) {
  const sliderItems = slider.querySelectorAll('.slider__item');

  switch(action) {
    case 'next':
      sliderCarousel.insertBefore(sliderItems[0], null);
      break;
    case 'prev':
      sliderCarousel.insertBefore(sliderItems[2], sliderItems[0]);
      break;
    default:
      break;
  }
}

function scrollSlide(action) {
  const nextSlideInfo = getSlideInfo(action);
  updatePageSlideInfo(nextSlideInfo);
  changeSlidePosition(action);
}

burgerIcon.addEventListener("click", () => openMenu());
[...headerLinks].forEach(element => element.addEventListener("click", () => closeMenu()));

nextBtn.addEventListener('click', () => scrollSlide('next'));
prevBtn.addEventListener('click', () => scrollSlide('prev'));
