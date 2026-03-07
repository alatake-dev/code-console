import { registerBlockType } from '@wordpress/blocks';
import { terminal } from '@wordpress/icons'; // Importamos el icono como componente SVG
import './style.scss';
import Edit from './edit';
import metadata from './block.json';


const terminalIcon = (
	<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M20,19H4c-1.1,0-2-0.9-2-2V7c0-1.1,0.9-2,2-2h16c1.1,0,2,0.9,2,2v10C22,18.1,21.1,19,20,19z M4,7v10h16V7H4z M12,15H7v-2h5 V15z M10.4,11.4L9,12.8L6.2,10L9,7.2l1.4,1.4L8.9,10L10.4,11.4z" />
	</svg>
);

registerBlockType( metadata.name, {
	...metadata,
	// Usamos el objeto de icono de WordPress directamente
	icon: terminalIcon,
	edit: Edit,
	save: () => null,
} );
