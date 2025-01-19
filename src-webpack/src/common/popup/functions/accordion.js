/* === Accordion Logic === */

// Top Category Menu
export function initTopCategoryMenuAccordion() {
	const accordionHeader = document.querySelector('#top-menu-accordion .accordion-header');
	const accordionContent = document.getElementById('top-menu');
	const btn = document.querySelector('#top-menu-accordion .accordion-btn');
	let isOpen = true;

	if (localStorage.getItem('topCategoryMenu') === 'false') {
		isOpen = false;
	}
	setOpenAccordionState(isOpen);
	accordionHeader.addEventListener('click', toggleAccordion);

	function toggleAccordion() {
		document.querySelector('.accordion-btn').classList.add('accordion-transition');
		document.querySelector('.accordion-content').classList.add('accordion-transition');
		isOpen = !isOpen;
		if (isOpen) {
			accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
			btn.style.transform = 'rotate(90deg)';
		} else {
			accordionContent.style.maxHeight = '0';
			btn.style.transform = 'rotate(0deg)';
		}
		localStorage.setItem('topCategoryMenu', isOpen);
	}

	// Function to programmatically open or close the accordion
	function setOpenAccordionState(state) {
		if (state === false) {
			isOpen = false;
			accordionContent.style.maxHeight = '0';
			btn.style.transform = 'rotate(0deg)';
		} else {
			isOpen = true;
			accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
			btn.style.transform = 'rotate(90deg)';
		}
	}
}
