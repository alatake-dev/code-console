import { registerBlockType } from '@wordpress/blocks';
import { terminal } from '@wordpress/icons'; // Importamos el icono como componente SVG
import { Icon } from '@wordpress/components';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, {
	...metadata,
	// Usamos el objeto de icono de WordPress directamente
	icon: terminal,
	edit: Edit,
	save: () => null,
} );
