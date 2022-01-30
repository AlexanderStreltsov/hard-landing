const initialSlides = [
  {
    id: 'first',
    name: 'Шоссе',
    link: './images/highway.jpg',
    icon: 'slider__trapeze_icon_highway'
  },
  {
    id: 'second',
    name: 'Грэвел',
    link: './images/gravel.jpg',
    icon: 'slider__trapeze_icon_gravel'
  },
  {
    id: 'third',
    name: 'ТТ',
    link: './images/tt.jpg',
    icon: 'slider__trapeze_icon_tt'
  }
];

const infoSlides = {
  first: {
    id: 'first',
    next: 'second',
    prev: 'third',
    title: 'Шоссе',
    description: 'На\u00A0шоссейном велосипеде можно ездить по\u00A0асфальту на\u00A0разных градиентах: будь\u00A0то горы или равнины. Гонки проходят в\u00A0командном пелотоне, но\u00A0тренироваться можно и\u00A0самостоятельно.'
  },
  second: {
    id: 'second',
    next: 'third',
    prev: 'first',
    title: 'Грэвел',
    description: 'Грэвел похож на\u00A0шоссейный велосипед, но\u00A0конструкция рамы немного отличается, и\u00A0на\u00A0нём стоят более широкие покрышки, всё для того чтобы проехать по\u00A0лёгкому бездорожью.'
  },
  third: {
    id: 'third',
    next: 'first',
    prev: 'second',
    title: 'ТТ',
    description: 'ТТ\u00A0\u2013 это велосипед для триатлона или раздельного старта, гооняют на\u00A0таком велике только по\u00A0равнинному асфальту, велик очень быстрые и\u00A0аэродинамичный.'
  }
};

const burgerIcon = document.querySelector('.header__burger-icon');
const burgerIconCenterLine = document.querySelector('.header__burger-icon-center');
const navigation = document.querySelector('.header__wrapper');
const headerLinks = document.querySelectorAll('.header__link');

const slideTemplate = document.querySelector('#slide-template').content;
const slider = document.querySelector('.slider');
const sliderTitle = slider.querySelector('.slider__title');
const sliderDescription = slider.querySelector('.slider__description');
const sliderCarousel = slider.querySelector('.slider__carousel');
const sliderNextButton = slider.querySelector('.slider__button_type_next');
const sliderPrevButton = slider.querySelector('.slider__button_type_prev');


const closeMenu = () => {
  burgerIcon.classList.remove('header__burger-icon_open');
  burgerIconCenterLine.classList.remove('header__burger-icon-center_open');
  navigation.classList.remove('header__wrapper_open');
}

const openMenu = () => {
  const burgerIconClasses = burgerIcon.getAttribute("class");
  if (burgerIconClasses.includes('open')) {
    closeMenu();
  } else {
    burgerIcon.classList.add('header__burger-icon_open');
    burgerIconCenterLine.classList.add('header__burger-icon-center_open');
    navigation.classList.add('header__wrapper_open');
  }
}

const createSlide = (id, name, link, icon) => {
  const slideElement = slideTemplate.querySelector('.slider__list-item').cloneNode(true);
  const slideImage = slideElement.querySelector('.slider__image');
  const slideIcon = slideElement.querySelector('.slider__trapeze');

  slideElement.id = id;
  slideImage.src = link;
  slideImage.alt = name;
  slideIcon.classList.add(icon)

  if (id === 'first') {
    slideElement.classList.add('active');
    slideIcon.classList.remove('slider__trapeze_display');
  }

  return slideElement;
}

const addElements = (type, data) => {
  switch (type) {
    case 'slider':
      data.forEach(item => sliderCarousel.append(item));
      break;
    default:
      break;
  }
};

const getNewSlideInfo = (action) => {
  const currentSlide = slider.querySelector('.active');
  const currentSlideInfo = infoSlides[currentSlide.id];

  currentSlide.classList.remove('active');

  const icon = currentSlide.querySelector('.slider__trapeze');
  icon.classList.add('slider__trapeze_display');

  const newSlideInfo = action === 'next'
    ? infoSlides[currentSlideInfo.next]
    : infoSlides[currentSlideInfo.prev];

  newSlideInfo.action = action;

  return newSlideInfo;
}

const moveToNextSlide = (speed, offset, icon) => {
  sliderCarousel.style.cssText = `transition: margin ${speed}ms ease;`;
  sliderCarousel.style.marginLeft = `${offset}px`

  setTimeout(() => {
    sliderCarousel.style.cssText = 'transition: none;';
    const element = sliderCarousel.firstElementChild;
    const buffer = element.cloneNode(true);
    sliderCarousel.appendChild(buffer);
    sliderCarousel.removeChild(element);
    sliderCarousel.style.marginLeft = '0px';
    icon.classList.remove('slider__trapeze_display');
  }, speed);
}

const movePrevSlide = (speed, offset) => {
  const element = sliderCarousel.lastElementChild;
  const buffer = element.cloneNode(true);
  sliderCarousel.insertBefore(buffer, sliderCarousel.firstElementChild);
  sliderCarousel.removeChild(element);
  sliderCarousel.style.marginLeft = `${offset}px`;
  window.getComputedStyle(sliderCarousel).marginLeft;
  sliderCarousel.style.cssText = `transition: margin ${speed}ms ease;`;
  sliderCarousel.style.marginLeft = '0px';
  const newSlideFromCopy = sliderCarousel.querySelector('.active');
  const icon = newSlideFromCopy.querySelector('.slider__trapeze');
  setTimeout(() => {
    sliderCarousel.style.cssText = 'transition: none;';
    icon.classList.remove('slider__trapeze_display');
  }, speed);
}

const updateSlidePosition = (info) => {
  const newSlide = slider.querySelector(`#${info.id}`);
  newSlide.classList.add('active');

  sliderTitle.textContent = info.title;
  sliderDescription.textContent = info.description;

  const icon = newSlide.querySelector('.slider__trapeze');

  const speed = '500';
  const offset = -(newSlide.clientWidth + 40);
  const action = info.action;

  !!(action === 'next')
    ? moveToNextSlide(speed, offset, icon)
    : movePrevSlide(speed, offset);
}

const moveSlide = (action) => {
  const newSlideInfo = getNewSlideInfo(action);
  updateSlidePosition(newSlideInfo);
}

burgerIcon.addEventListener("click", () => openMenu());
[...headerLinks].forEach(element => element.addEventListener("click", () => closeMenu()));

sliderNextButton.addEventListener('click', () => moveSlide('next'));
sliderPrevButton.addEventListener('click', () => moveSlide('prev'));

const initSlidesElements = initialSlides.map(item => createSlide(item.id, item.name, item.link, item.icon));
addElements('slider', initSlidesElements);
