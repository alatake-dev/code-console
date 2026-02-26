/**
 * Script de Front-end para Code Console.
 */
document.addEventListener('DOMContentLoaded', () => {
	const containers = document.querySelectorAll('.tk-console-wrapper');

	containers.forEach((container) => {
		const tabs = container.querySelectorAll('.tk-tab-item');
		const contents = container.querySelectorAll('.tk-tab-content');

		tabs.forEach((tab) => {
			tab.addEventListener('click', () => {
				const targetIndex = tab.getAttribute('data-index');

				// 1. Gestionar clases activas en pestañas
				tabs.forEach(t => t.classList.remove('is-active'));
				tab.classList.add('is-active');

				// 2. Gestionar visibilidad de contenidos
				contents.forEach((content) => {
					if (content.getAttribute('data-content-index') === targetIndex) {
						content.style.display = 'block';
						content.classList.add('is-active');
					} else {
						content.style.display = 'none';
						content.classList.remove('is-active');
					}
				});

				// 3. DISPARAR EVENTO PARA GTM (DataLayer)
				// Usamos los data-attributes que definimos en render.php
				if (window.dataLayer) {
					window.dataLayer.push({
						'event': tab.getAttribute('data-gtm-event'),
						'category': tab.getAttribute('data-gtm-category'),
						'action': 'tab_switch',
						'label': tab.getAttribute('data-gtm-tab-label'),
						'tab_pos': tab.getAttribute('data-gtm-tab-position'),
						'block_alias': tab.getAttribute('data-gtm-block-alias'),
						'post_title': tab.getAttribute('data-gtm-post-title'),
						'language': tab.getAttribute('data-gtm-lang')
					});
				}
			});
		});

		// Lógica para el botón de Copiar
		const copyButtons = container.querySelectorAll('.tk-copy-btn');
		copyButtons.forEach((btn) => {
			btn.addEventListener('click', () => {
				const activeContent = container.querySelector('.tk-tab-content.is-active code');
				if (activeContent) {
					navigator.clipboard.writeText(activeContent.innerText).then(() => {
						const originalText = btn.innerText;
						btn.innerText = '¡Copiado!';
						setTimeout(() => btn.innerText = originalText, 2000);

						// Evento GTM para Copiar
						if (window.dataLayer) {
							window.dataLayer.push({
								'event': 'code_copy',
								'block_alias': btn.getAttribute('data-gtm-block-alias')
							});
						}
					});
				}
			});
		});
	});
});
