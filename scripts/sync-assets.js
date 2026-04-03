const fs = require('fs');
const path = require('path');

// Definimos rutas de origen y destino
const srcRoot = path.join(__dirname, '../node_modules/prismjs');
const destRoot = path.join(__dirname, '../assets/prism');

const filesToCopy = [
	{ src: 'prism.js', dest: 'prism.min.js' },
	{ src: 'plugins/autoloader/prism-autoloader.min.js', dest: 'plugins/autoloader/prism-autoloader.min.js' },
	{ src: 'themes/prism-okaidia.css', dest: 'themes/prism-okaidia.css' }
];

// Función para asegurar que las carpetas existan
function ensureDir(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
}

console.log('🚀 Iniciando sincronización de assets para Triskelion Code Console...');

// 1. Copiar archivos principales
filesToCopy.forEach(file => {
	const src = path.join(srcRoot, file.src);
	const dest = path.join(destRoot, file.dest);
	ensureDir(path.dirname(dest));
	fs.copyFileSync(src, dest);
	console.log(`✅ Copiado: ${file.src}`);
});

// 2. Copiar TODOS los componentes (lenguajes) para el Autoloader
const componentsSrc = path.join(srcRoot, 'components');
const componentsDest = path.join(destRoot, 'components');
ensureDir(componentsDest);

const languages = fs.readdirSync(componentsSrc).filter(file => file.endsWith('.min.js'));

languages.forEach(lang => {
	fs.copyFileSync(path.join(componentsSrc, lang), path.join(componentsDest, lang));
});

console.log(`📦 Sincronizados ${languages.length} lenguajes en /assets/prism/components/`);
console.log('✨ Proceso terminado. ¡A darle al backend!');
