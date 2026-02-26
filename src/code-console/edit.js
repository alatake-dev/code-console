import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	PlainText
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	Button,
	ButtonGroup // Nuevo componente para agrupar botones
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { tabs, activeTabIndex } = attributes;
	const blockProps = useBlockProps( { className: 'tk-console-admin' } );

	const updateTab = ( key, value, index ) => {
		const newTabs = [ ...tabs ];
		newTabs[ index ] = { ...newTabs[ index ], [ key ]: value };
		setAttributes( { tabs: newTabs } );
	};

	const addTab = () => {
		const newTabs = [ ...tabs, {
			title: '',
			language: 'javascript',
			content: ''
		} ];
		setAttributes( { tabs: newTabs, activeTabIndex: newTabs.length - 1 } );
	};

	const removeTab = ( index ) => {
		if ( tabs.length <= 1 ) return;
		const newTabs = tabs.filter( ( _, i ) => i !== index );
		const newIndex = activeTabIndex >= newTabs.length ? newTabs.length - 1 : activeTabIndex;
		setAttributes( { tabs: newTabs, activeTabIndex: Math.max( 0, newIndex ) } );
	};

	// Función para mover pestañas
	const moveTab = ( direction ) => {
		const newIndex = direction === 'up' ? activeTabIndex - 1 : activeTabIndex + 1;

		// Verificamos límites
		if ( newIndex < 0 || newIndex >= tabs.length ) return;

		const newTabs = [ ...tabs ];
		// Intercambio de posiciones
		[ newTabs[ activeTabIndex ], newTabs[ newIndex ] ] = [ newTabs[ newIndex ], newTabs[ activeTabIndex ] ];

		setAttributes( {
			tabs: newTabs,
			activeTabIndex: newIndex // Seguimos a la pestaña movida
		} );
	};

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Configuración de Pestaña', 'code-console' ) }>
					<SelectControl
						label={ __( 'Lenguaje' ) }
						value={ tabs[ activeTabIndex ]?.language || 'javascript' }
						options={ [
							{ label: 'Bash', value: 'bash' },
							{ label: 'CSS', value: 'css' },
							{ label: 'HTML', value: 'markup' }, // Prism usa 'markup' para HTML
							{ label: 'Java', value: 'java' },
							{ label: 'JavaScript', value: 'javascript' },
							{ label: 'JSON', value: 'json' },
							{ label: 'PHP', value: 'php' },
							{ label: 'Python', value: 'python' },
							{ label: 'SQL', value: 'sql' },
							{ label: 'TypeScript', value: 'typescript' },
							{ label: 'YAML', value: 'yaml' },
						] }
						onChange={ ( val ) => updateTab( 'language', val, activeTabIndex ) }
					/>

					<div style={ { marginBottom: '20px' } }>
						<label className="components-base-control__label" style={ { display: 'block', marginBottom: '8px' } }>
							{ __( 'Orden de pestaña' ) }
						</label>
						<ButtonGroup>
							<Button
								variant="secondary"
								icon="arrow-up-alt2"
								onClick={ () => moveTab( 'up' ) }
								disabled={ activeTabIndex === 0 }
								label={ __( 'Mover arriba/izquierda' ) }
							/>
							<Button
								variant="secondary"
								icon="arrow-down-alt2"
								onClick={ () => moveTab( 'down' ) }
								disabled={ activeTabIndex === tabs.length - 1 }
								label={ __( 'Mover abajo/derecha' ) }
							/>
						</ButtonGroup>
					</div>

					<hr />

					<Button
						isDestructive
						variant="link"
						onClick={ () => removeTab( activeTabIndex ) }
						disabled={ tabs.length <= 1 }
						style={ { padding: 0 } }
					>
						{ __( 'Eliminar pestaña actual' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div className="tk-console-header">
				<div className="tk-console-tabs-nav">
					{ tabs.map( ( tab, i ) => (
						<div key={ i } className={ `tk-tab-wrapper ${ activeTabIndex === i ? 'is-active' : '' }` }>
							<button
								className="tk-tab-select"
								onClick={ ( e ) => { e.preventDefault(); setAttributes( { activeTabIndex: i } ); } }
							>
								<RichText
									tagName="span"
									value={ tab.title }
									onChange={ ( val ) => updateTab( 'title', val, i ) }
									placeholder={ __( 'nombre.ext' ) }
									allowedFormats={ [] }
								/>
							</button>
						</div>
					) ) }
					<Button onClick={ addTab } icon="plus" isSmall className="tk-add-tab-btn" />
				</div>
			</div>

			<div className="tk-console-body">
				<div className="tk-admin-lang-indicator">
					{ (tabs[ activeTabIndex ]?.language || 'js').toUpperCase() }
				</div>
				<PlainText
					value={ tabs[ activeTabIndex ]?.content }
					onChange={ ( val ) => updateTab( 'content', val, activeTabIndex ) }
					placeholder={ __( '// Pega tu código aquí...' ) }
					className="tk-code-plain-area"
				/>
			</div>
		</div>
	);
}
