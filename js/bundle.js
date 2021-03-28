/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
// Calculator практика

const result = document.querySelector('.calculating__result span');
    
let sex, height, weight, age, ratio;

if (localStorage.getItem('sex')) {
	 sex = localStorage.getItem('sex');
} else {
	 sex = 'female';
	 localStorage.setItem('sex', 'female');
}

if (localStorage.getItem('ratio')) {
	 ratio = localStorage.getItem('ratio');
} else {
	 ratio = 1.375;
	 localStorage.setItem('ratio', 1.375);
}

function calcTotal() {
	 if (!sex || !height || !weight || !age || !ratio) {
		  result.textContent = '____';
		  return;
	 }
	 if (sex === 'female') {
		  result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
	 } else {
		  result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
	 }
}

calcTotal();

function initLocalSettings(selector, activeClass) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(elem => {
	  elem.classList.remove(activeClass);
	  if (elem.getAttribute('id') === localStorage.getItem('sex')) {
			  elem.classList.add(activeClass);
	  }
	  if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
			  elem.classList.add(activeClass);
	  }
  });
}

initLocalSettings('#gender div', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

function getStaticInformation(selector, activeClass) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(elem => {
	  elem.addEventListener('click', (e) => {
			  if (e.target.getAttribute('data-ratio')) {
				  ratio = +e.target.getAttribute('data-ratio');
				  localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
			  } else {
				  sex = e.target.getAttribute('id');
				  localStorage.setItem('sex', e.target.getAttribute('id'));
			  }

			  elements.forEach(elem => {
				  elem.classList.remove(activeClass);
			  });

			  e.target.classList.add(activeClass);

			  calcTotal();
	  });
  });
}

getStaticInformation('#gender div', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

function getDynamicInformation(selector) {
  const input = document.querySelector(selector);

  input.addEventListener('input', () => {
	  if (input.value.match(/\D/g)) {
			  input.style.border = "1px solid red";
	  } else {
			  input.style.border = 'none';
	  }
	  switch(input.getAttribute('id')) {
			  case "height":
				  height = +input.value;
				  break;
			  case "weight":
				  weight = +input.value;
				  break;
			  case "age":
				  age = +input.value;
				  break;
	  }

	  calcTotal();
  });
}

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');
}

//module.exports = calc;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
	// Используем классы для карточек

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> рублей/день</div>
				</div
			`;
			this.parent.append(element);
		}	
	}

   // Каждая MenuCard
	//getResource('http://localhost:3000/menu')
	//.then(data => {
	//	data.forEach(({img, altimg, title, descr, price}) => {
	//		new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	//	});
	//});
	
	// Библиотека axios
	//axios.get('http://localhost:3000/menu')
	//.then(data => {
	//	data.data.forEach(({img, altimg, title, descr, price}) => {
	//		new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	//	});
	//});

	// Каждая MenuCard второй способ
	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
	.then(data => createCard(data));
		function createCard(data) {
			data.forEach(({img, altimg, title, descr, price}) => {
				const element = document.createElement('div');

				element.classList.add('menu__item');

				element.innerHTML = `
				<img src=${img} alt=${altimg}>
				<h3 class="menu__item-subtitle">${title}</h3>
				<div class="menu__item-descr">${descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${price}</span> рублей/день</div>
				</div
				`;
				document.querySelector('.menu .container').append(element);
			});
		}
}

//module.exports = cards;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
	// Forms
	const forms = document.querySelectorAll(formSelector);

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо, мы скоро с Вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	function bindPostData (form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			//form.append(statusMessage);
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
			})
			.catch(() => {
				showThanksModal(message.failure);
			})
			.finally(() => {
				form.reset();
			});
		});
	}

	//Красивое модальное окно благодарности

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
			<div class="modal__close data-close>×</div>
			<div class="modal__title">${message}</div>
		</div>`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
		}, 4000);
	}
}
//module.exports = forms;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('hide');
	modal.classList.remove('show');
	//modal.classList.toggle('show');
	document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show');
	modal.classList.remove('hide');
	//modal.classList.toggle('show');
	document.body.style.overflow = 'hidden';

	console.log(modalTimerId);
	if(modalTimerId) {
		clearInterval(modalTimerId);
	}
}


function modal(triggweSelector, modalSelector, modalTimerId) {
// Modal
const modalTrigger = document.querySelectorAll(triggweSelector),
		modal = document.querySelector(modalSelector);

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});
	
	modal.addEventListener('click', (e) => {
		if(e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	function showModalByScroll() {
		if ((window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);
}

//module.exports = modal;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
	fetch('db.json')
		.then(data => data.json())
		.then(res => console.log(res));

     //Slider вариант 1 практика
	//let slideIndex = 1;
	//const slides = document.querySelectorAll('.offer__slide'),
	//		prev = document.querySelector('.offer__slider-prev'),
	//		next = document.querySelector('.offer__slider-next'),
	//		total = document.querySelector('#total'),
	//		current = document.querySelector('#current');

	//showSlides(slideIndex);

	//if (slides.length < 10) {
	//		total.textContent = `0${slides.length}`;
	//} else {
	//		total.textContent = slides.length;
	//}

	//function showSlides(n) {
	//		if (n > slides.length) {
	//			slideIndex = 1;
	//		}
	//		if (n < 1) {
	//			slideIndex = slides.length;
	//		}

	//		slides.forEach((item) => item.style.display = 'none');

	//		slides[slideIndex - 1].style.display = 'block'; // Как ваша самостоятельная работа - переписать на использование классов show/hide
			
	//		if (slides.length < 10) {
	//			current.textContent =  `0${slideIndex}`;
	//		} else {
	//			current.textContent =  slideIndex;
	//		}
	//}

	//function plusSlides (n) {
	//		showSlides(slideIndex += n);
	//}

	//prev.addEventListener('click', function(){
	//		plusSlides(-1);
	//});

	//next.addEventListener('click', function(){
	//		plusSlides(1);
	//});

	// Slider вариант 2 практика
	//let offset = 0;
	//let slideIndex = 1;

	//const slides = document.querySelectorAll('.offer__slide'),
	//	prev = document.querySelector('.offer__slider-prev'),
	//	next = document.querySelector('.offer__slider-next'),
	//	total = document.querySelector('#total'),
	//	current = document.querySelector('#current'),
	//	slidesWrapper = document.querySelector('.offer__slider-wrapper'),
	//	width = window.getComputedStyle(slidesWrapper).width,
	//	slidesField = document.querySelector('.offer__slider-inner');

	//if (slides.length < 10) {
	//	total.textContent = `0${slides.length}`;
	//	current.textContent =  `0${slideIndex}`;
	//} else {
	//	total.textContent = slides.length;
	//	current.textContent =  slideIndex;
	//}
	
	//slidesField.style.width = 100 * slides.length + '%';
	//slidesField.style.display = 'flex';
	//slidesField.style.transition = '0.5s all';

	//slidesWrapper.style.overflow = 'hidden';

	//slides.forEach(slide => {
	//	slide.style.width = width;
	//});

	//next.addEventListener('click', () => {
	//	if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
	//		offset = 0;
	//	} else {
	//		offset += +width.slice(0, width.length - 2); 
	//	}

	//	slidesField.style.transform = `translateX(-${offset}px)`;

	//	if (slideIndex == slides.length) {
	//		slideIndex = 1;
	//	} else {
	//		slideIndex++;
	//	}

	//	if (slides.length < 10) {
	//		current.textContent =  `0${slideIndex}`;
	//	} else {
	//		current.textContent =  slideIndex;
	//	}
	//});

	//prev.addEventListener('click', () => {
	//	if (offset == 0) {
	//		offset = +width.slice(0, width.length - 2) * (slides.length - 1);
	//	} else {
	//		offset -= +width.slice(0, width.length - 2);
	//	}

	//	slidesField.style.transform = `translateX(-${offset}px)`;

	//	if (slideIndex == 1) {
	//		slideIndex = slides.length;
	//	} else {
	//		slideIndex--;
	//	}

	//	if (slides.length < 10) {
	//		current.textContent =  `0${slideIndex}`;
	//	} else {
	//		current.textContent =  slideIndex;
	//	}
	//});

// Slider точки практика

	let offset = 0;
	let slideIndex = 1;

	const slides = document.querySelectorAll(slide),
		slider = document.querySelector(container),
		prev = document.querySelector(prevArrow),
		next = document.querySelector(nextArrow),
		total = document.querySelector(totalCounter),
		current = document.querySelector(currentCounter),
		slidesWrapper = document.querySelector(wrapper),
		width = window.getComputedStyle(slidesWrapper).width,
		slidesField = document.querySelector(field);

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent =  `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent =  slideIndex;
	}
	
	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
			dots = [];
	indicators.classList.add('carousel-indicators');
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`; // Если хотите - добавьте в стили, но иногда у нас нет доступа к стилям
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	//function deleteNotDigits (str) {  //функция замены все нецифры на пустой пробел
	//	+str.replace(/\D/g, ''
	//}

	next.addEventListener('click', () => {
		if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {   // (+width.replace(/\D/g, '') можно заменить так все нецифры на пустой пробел
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2); // (+width.replace(/\D/g, '') можно заменить так все нецифры на пустой пробел
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent =  `0${slideIndex}`;
		} else {
			current.textContent =  slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = ".5");
		dots[slideIndex-1].style.opacity = 1;
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1); // (+width.replace(/\D/g, '') можно заменить так все нецифры на пустой пробел
		} else {
			offset -= +width.slice(0, width.length - 2); // (+width.replace(/\D/g, '') можно заменить так все нецифры на пустой пробел
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent =  `0${slideIndex}`;
		} else {
			current.textContent =  slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = ".5");
		dots[slideIndex-1].style.opacity = 1;
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = +width.slice(0, width.length - 2) * (slideTo - 1); // (+width.replace(/\D/g, '') можно заменить так все нецифры на пустой пробел

			slidesField.style.transform = `translateX(-${offset}px)`;

			if (slides.length < 10) {
					current.textContent =  `0${slideIndex}`;
			} else {
					current.textContent =  slideIndex;
			}

			dots.forEach(dot => dot.style.opacity = ".5");
			dots[slideIndex-1].style.opacity = 1;
		});
	});
}

//module.exports = slider;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentsSelector, activeClass) {
	// Tabs
	let tabs = document.querySelectorAll(tabsSelector),
			tabsContent = document.querySelectorAll(tabsContentSelector),
			tabsParent = document.querySelector(tabsParentsSelector);

	function hideTabContent () {
		tabsContent.forEach(item => {
			//item.style.display = 'none';
			item.classList.add('hide');
			item.classList.remove('show', 'fade');

		});

		tabs.forEach(item=> {
			item.classList.remove(activeClass);
		});
	}

	function showTabContent (i=0) {
		//tabsContent[i].style.display = 'block';
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add(activeClass);
	}

	hideTabContent ();
	showTabContent ();

	tabsParent.addEventListener('click', (event) =>{
		const target = event.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item,i) => {
				if (target == item) {
					hideTabContent ();
					showTabContent (i);
				}
			});
		}
	});
}

//module.exports = tabs;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
//Timer
//const deadline = '2021-04-11';

function getTimeRemaining (endtime) {
	const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor(t / (1000 * 60 * 60) % 24),
			minutes = Math.floor((t / 1000 * 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

	return {
		'total': t,
		'days':days,
		'hours':hours,
		'minutes':minutes,
		'seconds':seconds
	};
}

function getZero (num) {
	if (num >= 0 && num < 10) {
		return `0${num}`;
	} else {
		return num;
	}
}

function setClock (selector, endtime) {
	const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

	updateClock ();

	function updateClock () {
		const t = getTimeRemaining (endtime);

		days.innerHTML = getZero(t.days) ;
		hours.innerHTML = getZero(t.hours);
		minutes.innerHTML = getZero(t.minutes);
		seconds.innerHTML = getZero(t.seconds);

		if (t.total <=0) {
			clearInterval(timeInterval);
		}
	}
}
setClock(id, deadline);

//let ssuumm = sum((1)(2)(3)(2));
//console.log(ssuumm);
}

//module.exports = timer;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async (url, data) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
		'Content-type': 'application/json'
		},
		body: data
	});
	return await res.json();			
};

async function getResource(url) {
	let res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	}
	return await res.json();			
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded', () => {
	//const tabs = require('./modules/tabs'),
	//	modal = require('./modules/modal'),
	//	timer = require('./modules/timer'),
	//	cards = require('./modules/cards'),
	//	calc = require('./modules/calc'),
	//	forms = require('./modules/forms'),
	//	slider = require('./modules/slider');

	const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 300000);

	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal', modalTimerId);
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.timer', '2022-06-11');
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__.default)();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)('form', modalTimerId);
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)({
		container: '.offer__slider',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		slide: '.offer__slide',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map