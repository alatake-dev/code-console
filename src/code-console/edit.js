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
	__experimentalHStack as HStack,
	Button,
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
							{ label: 'HTML', value: 'markup' },
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
						<HStack justify="flex-start" spacing={ 2 }>
							<Button
								variant="secondary"
								icon="arrow-up-alt2"
								onClick={ () => moveTab( 'up' ) }
								disabled={ activeTabIndex === 0 }
								label={ __( 'Mover arriba' ) }
								showTooltip // Esto hace que aparezca el cartelito al pasar el mouse
							/>
							<Button
								variant="secondary"
								icon="arrow-down-alt2"
								onClick={ () => moveTab( 'down' ) }
								disabled={ activeTabIndex === tabs.length - 1 }
								label={ __( 'Mover abajo' ) }
								showTooltip
							/>
						</HStack>
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

			{/* ESTRUCTURA VISUAL SINCRONIZADA CON EL FRONT */}
			<div className="tk-console-wrapper wp-block-triskelion-code-console">
				<div className="tk-console-header">
					<div className="tk-console-dots">
						<span className="tk-dot red"></span>
						<span className="tk-dot yellow"></span>
						<span className="tk-dot green"></span>
					</div>

					<div className="tk-console-tabs-nav">
						{ tabs.map( ( tab, i ) => (
							<button
								key={ i }
								className={ `tk-tab-item ${ activeTabIndex === i ? 'is-active' : '' }` }
								onClick={ ( e ) => {
									e.preventDefault();
									setAttributes( { activeTabIndex: i } );
								} }
							>
								<RichText
									tagName="span"
									value={ tab.title }
									onChange={ ( val ) => updateTab( 'title', val, i ) }
									placeholder={ __( 'nombre.ext' ) }
									allowedFormats={ [] }
								/>
							</button>
						) ) }
						<Button
							onClick={ addTab }
							icon="plus"
							isSmall
							className="tk-add-tab-btn"
							style={{ marginLeft: '10px', alignSelf: 'center' }}
						/>
					</div>
				</div>

				<div className="tk-console-body">
					<div className="tk-tab-content is-active">
						<div className="tk-wrapper">
							{/* Mantenemos tk-nav y dots internos si existen en el front */}
							<div className="tk-nav">
								<div className="tk-dots"></div>
							</div>

							<div className="tk-outer-container">
								<div className="tk-content active">
                                <pre className={ `language-${ tabs[ activeTabIndex ]?.language || 'javascript' }` }>
                                    <code>
                                        <PlainText
											value={ tabs[ activeTabIndex ]?.content }
											onChange={ ( val ) => updateTab( 'content', val, activeTabIndex ) }
											placeholder={ __( '// Pega tu código aquí...' ) }
											className="tk-code-plain-area"
										/>
                                    </code>
                                    <span className="tk-badge">
                                        { (tabs[ activeTabIndex ]?.language || 'js').toUpperCase() }
                                    </span>
                                </pre>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
