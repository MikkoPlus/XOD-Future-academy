'use strict'; 

window.addEventListener('DOMContentLoaded', () => {

	//  Set current town
	function setValueToLocaleStorage(key, value) {
		localStorage.setItem(key, value);
	}

	
	const townTrigger = document.querySelector('.header__town');

	if (localStorage.getItem('town')) {
		townTrigger.textContent = localStorage.getItem('town');
	} else {
		townTrigger.textContent = 'Нижний Новгород';
		setValueToLocaleStorage('town', townTrigger.textContent);
	}

	function townListHandler () {
		const townsList = document.querySelector('.towns'),
			  closeIcon = townsList.querySelector('.towns__close'),
			  townIndicator = document.querySelector('.header__cities');

		function closeTownList () {
		closeIcon.addEventListener('click', () => {
			townsList.classList.remove('towns_visible');
			townIndicator.classList.remove('header__cities_active');
		
		});
		}

		townTrigger.addEventListener('click', (e) => {
			e.preventDefault();

			townsList.classList.toggle('towns_visible');
			townIndicator.classList.toggle('header__cities_active');
			if (townsList.classList.contains('towns_visible')) {
				setTimeout(function() {
					townsList.closest('.page').addEventListener('click', event => {
						if (!event.target.closest('.header')) {
							townsList.classList.remove('towns_visible');
							townIndicator.classList.remove('header__cities_active');
						}
					});
				}, 500);

				townsList.addEventListener('click', event => {
					if (event.target.classList.contains('towns__list-town')) {
						const targetTown = event.target;

						setValueToLocaleStorage('town', targetTown.textContent);
						townTrigger.textContent = targetTown.textContent;
					}
				});
				document.addEventListener('keydown',(e) => {
					e.preventDefault();
					if (e.keyCode === 27) {
						townsList.classList.remove('towns_visible');
						townIndicator.classList.remove('header__cities_active');
					}
				});
				
				closeTownList ();
			}
		});
	}
	townListHandler();

	// Review slider

	function reviewSliderHandler () {
		const sliderWrapper = document.querySelector('.reviews__cards-wrapper'),
			  sliderInner = sliderWrapper.querySelector('.reviews__comments-inner'),
			  commentCard = sliderInner.querySelectorAll('.comment-card'),
			  scrollBar = document.querySelector('.reviews__scroll-bar'),
			  scroll = scrollBar.querySelector('.reviews__scroll'),
			  contentWrapper = document.querySelector('.content'),
			  clientViewSlider = contentWrapper.clientWidth;

		let sliderLength = commentCard.length;

			sliderInner.style.gridTemplateColumns = `repeat(${sliderLength}, 280px)`;

	let scrollWidth = (100 / sliderLength) * (clientViewSlider / 300);
	if (scrollWidth >= 100) {
		scroll.style.width = 100 + '%';
	} else {
		scroll.style.width = scrollWidth  + '%';
	}

	/* keep track of user's mouse down and up */
	let isPressedDown = false;
	/* x horizontal space of cursor from inner container */
	let cursorXSpace;

	sliderWrapper.addEventListener("mousedown", (e) => {
	isPressedDown = true;
	cursorXSpace = e.offsetX - sliderInner.offsetLeft;
	sliderWrapper.style.cursor = "grabbing";
	});

	sliderWrapper.addEventListener("mouseup", () => {
	sliderWrapper.style.cursor = "grab";
	});

	window.addEventListener("mouseup", () => {
	isPressedDown = false;
	});

	sliderWrapper.addEventListener("mousemove", (e) => {
	if (!isPressedDown) return;
	e.preventDefault();
	sliderInner.style.left = `${e.offsetX - cursorXSpace}px`;
	boundCards();
	});

	function boundCards() {
	const containerRect = sliderWrapper.getBoundingClientRect();
	const cardsRect = sliderInner.getBoundingClientRect();

	if (parseInt(sliderInner.style.left) > 0) {
		sliderInner.style.left = 0;
	} else if (cardsRect.right < containerRect.right) {
		sliderInner.style.left = `-${cardsRect.width - containerRect.width}px`;
	}
	}}
	reviewSliderHandler ();
});