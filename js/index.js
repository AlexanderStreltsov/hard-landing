const initialSlides = [
  {
    id: 'first',
    name: 'Шоссе',
    src: './images/highway.jpg',
    icon: 'slider__trapeze_icon_highway'
  },
  {
    id: 'second',
    name: 'Грэвел',
    src: './images/gravel.jpg',
    icon: 'slider__trapeze_icon_gravel'
  },
  {
    id: 'third',
    name: 'ТТ',
    src: './images/tt.jpg',
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

const initialBikes = {
  highway: [
    {
      name: 'Cervelo Caledonia-5',
      src: './images/highway-cervelo.jpg',
      alt: 'Сервело Каледония-5',
      link: 'https://www.sigmasports.com/item/Cervelo/Caledonia-5-Ultegra-Disc-Road-Bike-2021/RDEN '
    },
    {
      name: 'Cannondale Systemsix Himod',
      src: './images/highway-cannondale.jpg',
      alt: 'Каннондэйл Систсикс Химод',
      link: 'https://www.sigmasports.com/item/Cannondale/SystemSix-HiMOD-Ultegra-Di2-Disc-Road-Bike-2021/R82J'
    },
    {
      name: 'Trek Domane SL-7',
      src: './images/highway-trek.jpg',
      alt: 'Походный Доман СЛ-7',
      link: 'https://www.sigmasports.com/item/Trek/Domane-SL-7-Force-eTap-AXS-Disc-Road-Bike-2021/RULF'
    }
  ],
  gravel: [
    {
      name: 'Cervelo Aspero GRX 810',
      src: './images/gravel-cervelo.jpg',
      alt: 'Сервело Асперо 810',
      link: 'https://www.sigmasports.com/item/Cervelo/Aspero-GRX-810-1x-Disc-Gravel-Bike-2021/RJDE'
    },
    {
      name: 'Specialized S-Works Diverge',
      src: './images/gravel-specialized.jpg',
      alt: 'Специализированный С-Воркс Дайвердж',
      link: 'https://www.sigmasports.com/item/Specialized/S-Works-Diverge-Gravel-Bike-2020/NVJ9'
    },
    {
      name: 'Cannondale Topstone Lefty 3',
      src: './images/gravel-cannondale.jpg',
      alt: 'Кэннондейл Топстоун Лефти 3',
      link: 'https://www.sigmasports.com/item/Cannondale/Topstone-Carbon-Lefty-3-Disc-Gravel-Road-Bike-2021/PUC8'
    }
  ],
  tt: [
    {
      name: 'Specialized S-Works Shiv',
      src: './images/tt-specialized.jpg',
      alt: 'Специализированный С-Воркс Шив',
      link: 'https://www.sigmasports.com/item/Specialized/S-Works-Shiv-Disc-Limited-Edition-Triathlon-Bike-2019/K8P9'
    },
    {
      name: 'BMC Timemachine 01 ONE',
      src: './images/tt-bmc.jpg',
      alt: 'БМС Тайммашин 01',
      link: 'https://www.sigmasports.com/item/BMC/Timemachine-01-One-Force-Disc-TT-Triathlon-Bike-2021/S835'
    },
    {
      name: 'Cervelo P-Series',
      src: './images/tt-cervelo.jpg',
      alt: 'Сервело П-Серия',
      link: 'https://www.sigmasports.com/item/Cervelo/P-Series-Ultegra-Di2-TT-Triathlon-Bike-2021/RM6Q'
    }
  ]
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

const bikeTemplate = document.querySelector('#bike-template').content;
const bikesContainer = document.querySelector('.bikes__cards-list');
const bikesLinks = document.querySelector('.bikes__list');
const bikesSelect = document.querySelector('.bikes__select');


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

const createSlide = (id, name, src, icon) => {
  const slideElement = slideTemplate.querySelector('.slider__list-item').cloneNode(true);
  const slideImage = slideElement.querySelector('.slider__image');
  const slideIcon = slideElement.querySelector('.slider__trapeze');

  slideElement.id = id;
  slideImage.src = src;
  slideImage.alt = name;
  slideIcon.classList.add(icon)

  if (id === 'first') {
    slideElement.classList.add('active');
    slideIcon.classList.remove('slider__trapeze_display');
  }

  return slideElement;
}

const createBike = (name, src, alt, link) => {
  const bikeElement = bikeTemplate.querySelector('.bikes__card-item').cloneNode(true);
  const bikeImage = bikeElement.querySelector('.bikes__image');
  const bikeTitle = bikeElement.querySelector('.bikes__card-title');
  const bikeLink = bikeElement.querySelector('.bikes__link');

  bikeImage.src = src;
  bikeImage.alt = alt;
  bikeTitle.textContent = name;
  bikeLink.href = link;

  return bikeElement;
}

const getBikesElementsFromInit = (name) => initialBikes[name].map(item => createBike(item.name, item.src, item.alt, item.link));

const getBikesLinks = () => bikesLinks.querySelectorAll('.bikes__list-item');

const clearBikesContainer = () => {
  while (bikesContainer.firstChild) {
    bikesContainer.removeChild(bikesContainer.firstChild);
  }
}

const addBikesLinkActive = (current) => {
  const bikesLinks = getBikesLinks();
  bikesLinks.forEach(item => item.classList.remove('bikes__list-item_active'));
  current.classList.add('bikes__list-item_active');
}

const getNameBikesBlock = (value) => {
  let name;
  switch(value) {
    case 'Шоссе':
      name = 'highway';
      break;
    case 'Грэвел':
      name = 'gravel';
      break;
    case 'ТТ':
      name = 'tt';
      break;
    default:
      break;
  }

  return name;
}

const defineBikesLinksHandler = () => {
  const bikesLinks = getBikesLinks();
  [...bikesLinks].forEach(item => {
    item.addEventListener('click', () => {
      const name = getNameBikesBlock(item.textContent);
      clearBikesContainer();
      addBikesLinkActive(item);
      addElements('bikes', getBikesElementsFromInit(name));
    });
  });
}

const defineBikesSelect = () => {
  bikesSelect.addEventListener('change', () => {
    const bikesOptions = [...bikesSelect.querySelectorAll('.bikes__option')];
    bikesOptions.forEach(item => {
      if (item.selected) {
        const name = getNameBikesBlock(item.value);
        clearBikesContainer();
        addElements('bikes', getBikesElementsFromInit(name));
      }
    });
  });
}

const addElements = (type, data) => {
  switch (type) {
    case 'slider':
      data.forEach(item => sliderCarousel.append(item));
      break;
    case 'bikes':
      data.forEach(item => bikesContainer.append(item));
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

defineBikesLinksHandler();
defineBikesSelect();

const initSlidesElements = initialSlides.map(item => createSlide(item.id, item.name, item.src, item.icon));
addElements('slider', initSlidesElements);

addElements('bikes', getBikesElementsFromInit('highway'));
