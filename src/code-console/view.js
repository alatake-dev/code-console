document.addEventListener('DOMContentLoaded', () => {
	const wrappers = document.querySelectorAll('.tk-console-wrapper');

	wrappers.forEach(wrapper => {
		const tabs = wrapper.querySelectorAll('.tk-console-tab');
		const contents = wrapper.querySelectorAll('.tk-console-content');

		tabs.forEach((tab, index) => {
			tab.addEventListener('click', () => {
				// Remove active classes
				tabs.forEach(t => t.classList.remove('is-active'));
				contents.forEach(c => {
					c.classList.remove('is-active');
					c.style.display = 'none';
				});

				// Add active to clicked
				tab.classList.add('is-active');
				const target = contents[index];
				target.classList.add('is-active');
				target.style.display = 'block';
			});
		});
	});
});
