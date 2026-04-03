/**
 * Triskelion Code Console - Frontend Logic (Modern Standards)
 */

document.addEventListener('DOMContentLoaded', () => {

	if (!document.querySelector('.tk-console-wrapper')) return;

	// 1. Manejo de Pestañas (Tabs)
	document.body.addEventListener('click', (e) => {
		const tabBtn = e.target.closest('.tk-tab-item');
		if (!tabBtn) return;

		const wrapper = tabBtn.closest('.tk-console-wrapper');
		const index = tabBtn.dataset.index;

		// Desactivar tabs y contenidos previos
		wrapper.querySelectorAll('.tk-tab-item').forEach(btn => btn.classList.remove('is-active'));
		wrapper.querySelectorAll('.tk-tab-content').forEach(content => {
			content.classList.remove('is-active');
			content.style.display = 'none';
		});

		// Activar tab seleccionada
		tabBtn.classList.add('is-active');
		const activeContent = wrapper.querySelector(`.tk-tab-content[data-content-index="${index}"]`);
		if (activeContent) {
			activeContent.classList.add('is-active');
			activeContent.style.display = 'block';

			// Actualizar Badge de lenguaje
			const badge = wrapper.querySelector('#tk-current-lang');
			const codeElem = activeContent.querySelector('code');
			if (badge && codeElem) {
				const langMatch = codeElem.className.match(/language-(\w+)/);
				if (langMatch) badge.textContent = langMatch[1].toUpperCase();
			}
		}
	});

	// 2. Manejo del Botón de Copia (Clipboard API)
	document.body.addEventListener('click', async (e) => {
		const copyBtn = e.target.closest('.tk-copy-btn');
		if (!copyBtn) return;

		e.preventDefault();

		const wrapper = copyBtn.closest('.tk-console-wrapper');
		const activeCode = wrapper.querySelector('.tk-tab-content.is-active code');

		if (activeCode) {
			// navigator.clipboard es el estándar actual (requiere HTTPS o localhost)
			const textToCopy = (activeCode.innerText || activeCode.textContent).trim();

			try {
				await navigator.clipboard.writeText(textToCopy);

				// Feedback visual: Éxito
				copyBtn.classList.add('copied');
				setTimeout(() => copyBtn.classList.remove('copied'), 2000);

			} catch (err) {
				// Si falla (ej. contexto no seguro), al menos lo logueamos
				console.error('La Clipboard API falló. Verifica que estés en HTTPS.', err);

				// Un pequeño "shout-out" visual de error si quieres
				copyBtn.style.color = '#ff5f56';
				setTimeout(() => copyBtn.style.color = '', 2000);
			}
		}
	});
});

