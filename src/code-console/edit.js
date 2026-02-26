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
	Button
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { tabs, activeTabIndex } = attributes;

	// useBlockProps inyecta la clase .wp-block-triskelion-code-console automáticamente
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

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Configuración de Pestaña', 'code-console' ) }>
					<SelectControl
						label={ __( 'Lenguaje', 'code-console' ) }
						value={ tabs[ activeTabIndex ]?.language || 'javascript' }
						options={ [
							{ label: 'JavaScript', value: 'javascript' },
							{ label: 'PHP', value: 'php' },
							{ label: 'Python', value: 'python' },
							{ label: 'Java', value: 'java' },
							{ label: 'CSS', value: 'css' },
							{ label: 'HTML', value: 'html' },
							{ label: 'Bash', value: 'bash' },
						] }
						onChange={ ( val ) => updateTab( 'language', val, activeTabIndex ) }
					/>
					<Button
						isDestructive
						variant="link"
						onClick={ () => removeTab( activeTabIndex ) }
						disabled={ tabs.length <= 1 }
					>
						{ __( 'Eliminar pestaña actual', 'code-console' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div className="tk-console-header">
				<div className="tk-console-tabs-nav">
					{ tabs.map( ( tab, i ) => (
						<div key={ i } className={ `tk-tab-wrapper ${ activeTabIndex === i ? 'is-active' : '' }` }>
							<button
								className="tk-tab-select"
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
						</div>
					) ) }
					<Button
						onClick={ addTab }
						icon="plus"
						isSmall
						className="tk-add-tab-btn"
						label={ __( 'Añadir Pestaña' ) }
					/>
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
