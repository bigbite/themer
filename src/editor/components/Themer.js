import { mergeWith, isEmpty, isEqual } from 'lodash';
import {
	Button,
	Spinner,
	MenuGroup,
	MenuItem,
	__experimentalNavigatorProvider as NavigatorProvider,
} from '@wordpress/components';
import { useSelect, dispatch } from '@wordpress/data';
import { useEffect, useState, useMemo, useCallback } from '@wordpress/element';
import { MoreMenuDropdown } from '@wordpress/interface';
import apiFetch from '@wordpress/api-fetch';
import { trash } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import Nav from './Nav';
import Preview from './Preview';
import ButtonExport from './ButtonExport';
import ThemerNotice from './ThemerNotice';
import StylesPanel from './StylesPanel';

import useDebouncedApiFetch from '../../hooks/useDebouncedApiFetch';

import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';

import fetchSchema from '../../utils/schema-helpers';
import { getDefaultPreview } from '../../utils/blockPreviews';

/**
 * Themer App component
 *
 * @param {Object} props
 * @param {Object} props.editorSettings Localized settings for the block editor preview
 */
const Themer = ( { editorSettings } ) => {
	const [ previewMode, setPreviewMode ] = useState( 'visual' );
	const [ previewSize, setPreviewSize ] = useState( 'desktop' );
	const [ previewBlocks, setPreviewBlocks ] = useState();
	const [ previewExampleIsActive, setPreviewExampleIsActive ] = useState();
	const [ schema, setSchema ] = useState( {} );
	const [ validThemeJson, setValidThemeJson ] = useState();

	const setUserConfig = ( config ) => {
		dispatch( 'core' ).editEntityRecord(
			'root',
			'globalStyles',
			globalStylesId,
			config
		);
	};

	/**
	 * baseConfig: The base theme.json configuration
	 * userConfig: The user's edited theme.json configuration
	 * savedUserConfig: The user's most recently saved theme.json configuration
	 */
	const { globalStylesId, baseConfig, userConfig, savedUserConfig } =
		useSelect( ( select ) => {
			const {
				__experimentalGetCurrentGlobalStylesId,
				__experimentalGetCurrentThemeBaseGlobalStyles,
				getEditedEntityRecord,
				getEntityRecord,
			} = select( 'core' );

			const currentGlobalStylesId =
				__experimentalGetCurrentGlobalStylesId();

			return {
				globalStylesId: currentGlobalStylesId, // eslint-disable no-underscore-dangle -- require underscore dangle for experimental
				baseConfig: __experimentalGetCurrentThemeBaseGlobalStyles(), // eslint-disable no-underscore-dangle -- require underscore dangle for experimental functions
				userConfig: getEditedEntityRecord(
					'root',
					'globalStyles',
					currentGlobalStylesId
				),
				savedUserConfig: getEntityRecord(
					'root',
					'globalStyles',
					currentGlobalStylesId
				),
			};
		} );

	/**
	 * The merged theme.json configuration, combining the base and user configurations
	 */
	const themeConfig = useMemo( () => {
		if ( isEmpty( userConfig ) ) {
			return baseConfig;
		}
		const merged = mergeWith( {}, baseConfig, userConfig );
		return merged;
	}, [ userConfig, baseConfig ] );

	/**
	 * Determines if the user config is different from the most recently saved config.
	 */
	const hasUnsavedChanges = useMemo( () => {
		return ! isEqual( userConfig, savedUserConfig );
	}, [ userConfig, savedUserConfig ] );

	/**
	 * Fetch new preview CSS whenever config is changed
	 */
	const previewCss = useDebouncedApiFetch(
		'',
		{
			path: '/themer/v1/styles',
			method: 'POST',
			data: themeConfig || {},
		},
		themeConfig,
		100
	);

	/**
	 * Resets preview blocks to default template
	 */
	const resetPreviewBlocks = useCallback( () => {
		setPreviewBlocks( { name: 'default', blocks: getDefaultPreview() } );
	}, [ setPreviewBlocks ] );

	/**
	 * Loads the schema and validates the theme.json
	 */
	useEffect( () => {
		const loadSchemaAndValidateThemeJson = async () => {
			try {
				const schemaJson = await fetchSchema();
				setSchema( schemaJson );

				const themeJsonLoaded = await apiFetch( {
					path: '/themer/v1/theme-json-loaded',
					method: 'GET',
				} );
				setValidThemeJson( themeJsonLoaded );
			} catch ( err ) {
				// eslint-disable-next-line no-console
				console.log( err );
			}
		};

		loadSchemaAndValidateThemeJson();
	}, [ setSchema, setValidThemeJson ] );

	/**
	 * Alert user if they try to leave Themer without saving.
	 */
	useEffect( () => {
		// Detecting browser closing
		window.onbeforeunload = hasUnsavedChanges
			? () => hasUnsavedChanges
			: null;

		return () => {
			window.removeEventListener( 'beforeunload', () => {} );
		};
	}, [ hasUnsavedChanges ] );

	/**
	 * saves edited entity data
	 */
	const save = async () => {
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
	 * Resets theme db data back to the most recently saved config.
	 */
	const reset = () => {
		dispatch( 'core' ).editEntityRecord(
			'root',
			'globalStyles',
			globalStylesId,
			savedUserConfig
		);
	};

	const clearAllCustomisations = () => {
		dispatch( 'core' ).editEntityRecord(
			'root',
			'globalStyles',
			globalStylesId,
			baseConfig
		);
	};

	if ( validThemeJson?.error_type === 'error' ) {
		return (
			<ThemerNotice
				status={ validThemeJson?.error_type }
				message={ validThemeJson?.message }
				isDismissible={ false }
			/>
		);
	}

	if ( ! themeConfig || ! previewCss || ! globalStylesId ) {
		return (
			<>
				<Spinner />
			</>
		);
	}

	/**
	 * Add the live preview CSS to the block editor settings
	 */
	const augmentedEditorSettings = {
		...editorSettings,
		styles: [ ...editorSettings.styles, { css: previewCss } ],
	};

	return (
		<>
			<EditorContext.Provider
				value={ {
					globalStylesId,
					userConfig,
					themeConfig,
					schema,
					previewBlocks,
					setPreviewBlocks,
					resetPreviewBlocks,
					previewMode,
					setPreviewMode,
					previewSize,
					setPreviewSize,
					previewExampleIsActive,
					setPreviewExampleIsActive,
				} }
			>
				<StylesContext.Provider
					value={ {
						setUserConfig,
					} }
				>
					<div className="themer-topbar">
						<Button
							isSecondary
							onClick={ () => reset() }
							text={ __( 'Reset', 'themer' ) }
							disabled={ ! hasUnsavedChanges }
						/>
						<Button
							isPrimary
							onClick={ () => save() }
							text="Save"
							disabled={ ! hasUnsavedChanges }
						/>
						<MoreMenuDropdown>
							{ () => (
								<MenuGroup
									label={ __( 'Tools', 'themer' ) }
									className="themer-more-menu"
								>
									<ButtonExport />
									<MenuItem
										role="menuitem"
										icon={ trash }
										info={ __(
											'Resets all customisations to your initial theme.json configuration.',
											'themer'
										) }
										onClick={ () =>
											clearAllCustomisations()
										}
										isDestructive
									>
										{ __(
											'Clear all customisations',
											'themer'
										) }
									</MenuItem>
								</MenuGroup>
							) }
						</MoreMenuDropdown>
					</div>
					<NavigatorProvider initialPath="/">
						<div className="themer-body">
							<div className="themer-nav-container">
								<Nav />
							</div>
							<div className="themer-content-container">
								<div className="themer-styles-container">
									<StylesPanel />
								</div>

								<div className="themer-preview-container">
									<Preview
										editorSettings={
											augmentedEditorSettings
										}
									/>
								</div>
							</div>
						</div>
					</NavigatorProvider>
				</StylesContext.Provider>
			</EditorContext.Provider>
		</>
	);
};

export default Themer;
