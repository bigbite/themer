import { mergeWith, isEmpty } from 'lodash';
import { Button, Spinner, TabPanel } from '@wordpress/components';
import { useSelect, dispatch } from '@wordpress/data';
import { useEffect, useState, useMemo } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import schemaComponents from '../../ui/utils/schema-to-components';
import EditorContext from '../../context/EditorContext';

import Preview from './Preview';
import Fields from './Fields';
import ResponsiveButton from './ResponsiveButton';
import ButtonExport from '../ButtonExport';

/**
 * main component
 */
const ThemerComponent = () => {
	const [ previewCss, setPreviewCss ] = useState( '' );
	const [ previewSize, setPreviewSize ] = useState();

	const setUserConfig = ( config ) => {
		console.log( 'set user config at wrapper level' );

		dispatch( 'core' ).editEntityRecord(
			'root',
			'globalStyles',
			globalStylesId,
			config
		);
	};

	const { globalStylesId, baseConfig, userConfig } = useSelect(
		( select ) => {
			const {
				__experimentalGetCurrentGlobalStylesId,
				__experimentalGetCurrentThemeBaseGlobalStyles,
				getEditedEntityRecord,
			} = select( 'core' );

			const currentGlobalStylesId =
				__experimentalGetCurrentGlobalStylesId();

			return {
				globalStylesId: currentGlobalStylesId, // eslint-disable no-underscore-dangle -- require underscore dangle for experimental functions
				baseConfig: __experimentalGetCurrentThemeBaseGlobalStyles(), // eslint-disable no-underscore-dangle -- require underscore dangle for experimental functions
				userConfig: getEditedEntityRecord(
					'root',
					'globalStyles',
					currentGlobalStylesId
				),
			};
		}
	);

	/**
	 * Returns merged base and user configs
	 */
	const themeConfig = useMemo( () => {
		if ( isEmpty( userConfig ) ) {
			return baseConfig;
		}
		const merged = mergeWith( {}, baseConfig, userConfig );
		return merged;
	}, [ userConfig, baseConfig ] );

	/**
	 * Fetch new preview CSS whenever config is changed
	 */
	useEffect( () => {
		const updatePreviewCss = async () => {
			const res = await apiFetch( {
				path: '/themer/v1/styles',
				method: 'POST',
				data: themeConfig,
			} );
			if ( res ) {
				setPreviewCss( res );
			}
		};
		if ( themeConfig ) {
			updatePreviewCss();
		}
	}, [ themeConfig, setPreviewCss ] );

	/**
	 * saves edited entity data
	 */
	const save = async () => {
		// dispatch( 'core' ).undo();
		try {
			await dispatch( 'core' ).saveEditedEntityRecord(
				'root',
				'globalStyles',
				globalStylesId
			);
		} catch ( err ) {
			// eslint-disable-next-line no-console
			console.log( err );
		}
	};

	/**
	 * resets updated theme db data back to original theme.json
	 */
	const reset = () => {
		dispatch( 'core' ).editEntityRecord(
			'root',
			'globalStyles',
			globalStylesId,
			baseConfig
		);
	};

	/* TODO: refactor */
	const [ components, setComponents ] = useState( {} );
	useEffect( () => {
		const generate = async () => {
			const mappedComponents = await schemaComponents();
			setComponents( mappedComponents );
		};

		generate();
	}, [] );
	const { border: Border } = components?.styles ?? {};

	if ( ! themeConfig || ! previewCss ) {
		return (
			<>
				<Spinner />
			</>
		);
	}

	return (
		<>
			<style>{ previewCss }</style>
			<div className="themer-topbar">
				<Button isSecondary onClick={ () => reset() } text="Reset" />
				<Button isPrimary onClick={ () => save() } text="Save" />
			</div>
			<div className="themer-body">
				<div className="themer-nav-container">
					{ /* demo */ }
					<EditorContext.Provider
						value={ {
							globalStylesId,
							themeConfig,
							setUserConfig,
						} }
					>
						<Border selector="styles.blocks.core/pullquote.border" />
					</EditorContext.Provider>
					{ /* demo */ }
					{ /* <TabPanel
						className="themer-tab-panel"
						activeClass="active-themer-tab"
						tabs={ [
							{
								name: 'placeholder',
								title: 'Placeholder',
								className: 'placeholder',
							},
							{
								name: 'placeholder2',
								title: 'Placeholder 2',
								className: 'placeholder2',
							},
							{
								name: 'placeholder3',
								title: 'Placeholder 3',
								className: 'placeholder3',
							},
						] }
					>
						{ ( tab ) => (
							<>
								<p>{ tab.title }</p>
								<Fields sourceObject={ themeConfig } />
							</>
						) }
					</TabPanel> */ }
				</div>
				<div className="themer-preview-container">
					<ResponsiveButton
						setPreviewSize={ setPreviewSize }
						previewSize={ previewSize }
					/>
					<Preview
						baseOptions={ baseConfig }
						previewCss={ previewCss }
						previewSize={ previewSize }
					/>
					<ButtonExport />
				</div>
			</div>
		</>
	);
};

export default ThemerComponent;
