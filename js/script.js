'use strict';

setTimeout(function(){
	location.reload();
}, 25000);

window.addEventListener('DOMContentLoaded', () => {

	function closeOnEscape (currentClass, targetClass) {
		document.addEventListener('keydown',(e) => {
			e.preventDefault();
			if (e.keyCode === 27) {
				currentClass.classList.remove(targetClass);
			}
		});
	}

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
			closeIcon = townsList.querySelector('.towns__close');	

		function closeTownList () {
		closeIcon.addEventListener('click', () => townsList.classList.remove('towns_visible'));
		}

		townTrigger.addEventListener('click', (e) => {
			e.preventDefault();

			townsList.classList.toggle('towns_visible');
			if (townsList.classList.contains('towns_visible')) {
				setTimeout(function() {
					townsList.closest('.page').addEventListener('click', event => {
						if (!event.target.closest('.header')) {
							townsList.classList.remove('towns_visible');
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
				closeOnEscape(closeOnEscape, 'towns_visible');
				closeTownList ();
			}
		});
	}
	townListHandler();
});