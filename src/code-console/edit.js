import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	Button,
	Dashicon
} from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { tabs, activeTabIndex } = attributes;

	const updateTab = ( key, value, index ) => {
		const newTabs = [ ...tabs ];
		newTabs[ index ] = { ...newTabs[ index ], [ key ]: value };
		setAttributes( { tabs: newTabs } );
	};

	const addTab = () => {
		setAttributes( {
			tabs: [ ...tabs, { title: 'file.txt', language: 'javascript', content: '' } ],
			activeTabIndex: tabs.length
		} );
	};

	const removeTab = ( index ) => {
		const newTabs = tabs.filter( ( _, i ) => i !== index );
		setAttributes( {
			tabs: newTabs,
			activeTabIndex: Math.max( 0, index - 1 )
		} );
	};

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title={ __( 'Configuración de Pestaña', 'code-console' ) }>
					<SelectControl
						label={ __( 'Lenguaje', 'code-console' ) }
						value={ tabs[ activeTabIndex ]?.language }
						options={ [
							{ label: 'JavaScript', value: 'javascript' },
							{ label: 'Java', value: 'java' },
							{ label: 'PHP', value: 'php' },
							{ label: 'Python', value: 'python' },
							{ label: 'CSS', value: 'css' },
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

			<div className="tk-console-admin">
				<div className="tk-console-tabs-row">
					{ tabs.map( ( tab, i ) => (
						<button
							key={ i }
							className={ `tk-tab-btn ${ activeTabIndex === i ? 'is-active' : '' }` }
							onClick={ () => setAttributes( { activeTabIndex: i } ) }
						>
							<RichText
								tagName="span"
								value={ tab.title }
								onChange={ ( val ) => updateTab( 'title', val, i ) }
								placeholder={ __( 'nombre.ext', 'code-console' ) }
							/>
						</button>
					) ) }
					<Button onClick={ addTab } className="add-tab-btn"><Dashicon icon="plus" /></Button>
				</div>

				<div className="tk-console-content-edit">
					<RichText
						tagName="pre"
						value={ tabs[ activeTabIndex ]?.content }
						onChange={ ( val ) => updateTab( 'content', val, activeTabIndex ) }
						placeholder={ __( 'Pega tu código aquí...', 'code-console' ) }
						preserveWhiteSpace={ true }
					/>
				</div>
			</div>
		</div>
	);
}
