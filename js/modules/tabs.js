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
export default tabs;