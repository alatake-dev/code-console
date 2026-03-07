document.addEventListener('DOMContentLoaded', () => {
	// Usamos delegación de eventos para manejar N consolas con un solo listener
	document.body.addEventListener('click', (e) => {

		// --- 1. LÓGICA DE PESTAÑAS ---
		if (e.target.classList.contains('tk-tab-item')) {
			const tab = e.target;
			const consoleWrapper = tab.closest('.tk-console-wrapper');
			const index = tab.getAttribute('data-index');
			const langBadge = consoleWrapper.querySelector('#tk-current-lang');

			// Resetear pestañas activas
			consoleWrapper.querySelectorAll('.tk-tab-item').forEach(t => t.classList.remove('is-active'));
			tab.classList.add('is-active');

			// Intercambiar contenido
			consoleWrapper.querySelectorAll('.tk-tab-content').forEach(content => {
				if (content.getAttribute('data-content-index') === index) {
					content.style.display = 'block';
					content.classList.add('is-active');

					// Actualizar el Badge del Header (Cerebro)
					const pre = content.querySelector('pre');
					if (pre && langBadge) {
						const langClass = Array.from(pre.classList).find(c => c.startsWith('language-'));
						if (langClass) {
							const langName = langClass.replace('language-', '').toUpperCase();
							langBadge.textContent = langName;
						}
					}
				} else {
					content.style.display = 'none';
					content.classList.remove('is-active');
				}
			});
		}

		// --- 2. LÓGICA DE COPIADO (Botón Interno) ---
		if (e.target.classList.contains('tk-copy-btn')) {
			const btn = e.target;
			// Buscamos el bloque de código hermano dentro del contenedor
			const container = btn.closest('.tk-code-container');
			const codeBlock = container ? container.querySelector('code') : null;

			if (codeBlock) {
				const text = codeBlock.innerText.trim();
				navigator.clipboard.writeText(text).then(() => {
					const originalText = btn.textContent;
					btn.textContent = 'Copied!';
					btn.classList.add('copied');

					setTimeout(() => {
						btn.textContent = originalText;
						btn.classList.remove('copied');
					}, 2000);
				}).catch(err => {
					console.error('Error al copiar: ', err);
				});
			}
		}
	});
});
