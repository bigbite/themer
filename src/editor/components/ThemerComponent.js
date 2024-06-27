import { mergeWith, isEmpty, isEqual } from 'lodash';
import {
	Button,
	Spinner,
	MenuGroup,
	MenuItem,
	SelectControl,
	__experimentalNavigatorProvider as NavigatorProvider,
} from '@wordpress/components';
import { useSelect, dispatch } from '@wordpress/data';
import { useEffect, useState, useMemo, useCallback } from '@wordpress/element';
import { MoreMenuDropdown } from '@wordpress/interface';
import apiFetch from '@wordpress/api-fetch';
import { trash } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import Nav from './Nav';
import CodeView from './CodeView';
import ButtonExport from './ButtonExport';
import ThemerNotice from './ThemerNotice';
import StylesPanel from './StylesPanel';

import useDebouncedApiFetch from '../../hooks/useDebouncedApiFetch';

import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';

import fetchSchema from '../../utils/schema-helpers';
import { getDefaultPreview } from '../../utils/blockPreviews';

/**
 * main component
 */
const ThemerComponent = () => {
	const [ previewSize, setPreviewSize ] = useState();
	const [ previewBlocks, setPreviewBlocks ] = useState();
	const [ previewExampleIsActive, setPreviewExampleIsActive ] = useState();
	const [ schema, setSchema ] = useState( {} );
	const [ validThemeJson, setValidThemeJson ] = useState();
	const [ globalStylesId, setGlobalStylesId ] = useState( 0 );
	const [ styleVariations, setStyleVariations ] = useState( [] );
	const [ publishedStylesId, setPublishedStylesId ] = useState( 0 );

	const setUserConfig = ( config ) => {
		dispatch( 'core' ).editEntityRecord(
			'root',
			'globalStyles',
			globalStylesId,
			config
		);
	};

	const { baseConfig, userConfig, savedUserConfig } = useSelect(
		( select ) => {
			if ( ! globalStylesId ) {
				return {
					baseConfig: {},
					userConfig: {},
					savedUserConfig: {},
				};
			}

			const {
				__experimentalGetCurrentThemeBaseGlobalStyles,
				getEditedEntityRecord,
				getEntityRecord,
			} = select( 'core' );

			return {
				baseConfig: __experimentalGetCurrentThemeBaseGlobalStyles(), // eslint-disable no-underscore-dangle -- require underscore dangle for experimental functions
				userConfig: getEditedEntityRecord(
					'root',
					'globalStyles',
					globalStylesId
				),
				savedUserConfig: getEntityRecord(
					'root',
					'globalStyles',
					globalStylesId
				),
			};
		},
		[ globalStylesId ]
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
	 * Check if a valid theme.json is loaded.
	 */
	const validateThemeJson = async () => {
		const res = await apiFetch( {
			path: '/themer/v1/theme-json-loaded',
			method: 'GET',
		} );
		setValidThemeJson( res );
	};

	/**
	 * Retrieve all style variations for the theme and store the global style ID in state.
	 *
	 * @return {void}
	 */
	const getStyleVariations = async () => {
		const styleVariationsRes = await apiFetch( {
			path: '/themer/v1/style-variations',
			method: 'GET',
		} );
		setStyleVariations( styleVariationsRes );

		const activeVariation = styleVariationsRes?.find(
			( variation ) => variation.post_status === 'publish'
		);
		if ( ! activeVariation ) {
			return;
		}
		setPublishedStylesId( activeVariation.ID );
		setGlobalStylesId( activeVariation.ID );
	};

	/**
	 * Resets preview blocks to default template
	 */
	const resetPreviewBlocks = useCallback( () => {
		setPreviewBlocks( { name: 'default', blocks: getDefaultPreview() } );
	}, [ setPreviewBlocks ] );

	/**
	 * TODO: For demo purpose only, this should be refactored and
	 * implemented into the processing of the schema file task
	 */
	useEffect( () => {
		( async () => {
			const schemaJson = await fetchSchema();
			setSchema( schemaJson );
		} )();
		validateThemeJson();
	}, [] );

	useEffect( () => {
		getStyleVariations();
	}, [] );

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

	/**
	 * Sets the active style variation for the theme.
	 */
	const activate = async () => {
		try {
			await apiFetch( {
				path: '/themer/v1/style-variations',
				method: 'POST',
				data: {
					globalStylesId,
				},
			} );
			setPublishedStylesId( globalStylesId );
		} catch ( err ) {
			// eslint-disable-next-line no-console
			console.log( err );
		}
	};

	const clearAllCustomisations = () => {
		dispatch( 'core' ).editEntityRecord(
			'root',
			'globalStyles',
			globalStylesId,
			baseConfig
		);
	};

	if ( ! themeConfig || ! previewCss || ! globalStylesId ) {
		return (
			<>
				<Spinner />
			</>
		);
	}

	const selectOptions = [
		{
			disabled: true,
			label: __( 'Select a style variation', 'themer' ),
			value: '',
		},
		,
		...styleVariations.map( ( variation ) => ( {
			label: variation.post_name,
			value: variation.ID,
		} ) ),
	];

	return (
		<>
			<EditorContext.Provider
				value={ {
					globalStylesId,
					themeConfig,
					schema,
					previewBlocks,
					setPreviewBlocks,
					resetPreviewBlocks,
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
					<ThemerNotice
						status={ validThemeJson?.error_type }
						message={ validThemeJson?.message }
						isDismissible={ false }
					/>
					{ validThemeJson === true && (
						<>
							<div className="themer-topbar">
								<SelectControl
									options={ selectOptions }
									value={ globalStylesId }
									onChange={ ( value ) =>
										setGlobalStylesId(
											parseInt( value, 10 )
										)
									}
								/>
								<Button
									isSecondary
									onClick={ () => reset() }
									text="Reset"
									disabled={ ! hasUnsavedChanges }
								/>
								<Button
									isPrimary
									onClick={ () => save() }
									text="Save"
									disabled={ ! hasUnsavedChanges }
								/>
								<Button
									isPrimary
									onClick={ activate }
									text={ __( 'Activate', 'themer' ) }
									disabled={
										publishedStylesId === globalStylesId
									}
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
										<div className="themer-code-view-container">
											<CodeView
												themeConfig={ themeConfig }
											/>
										</div>
									</div>
								</div>
							</NavigatorProvider>
						</>
					) }
				</StylesContext.Provider>
			</EditorContext.Provider>
		</>
	);
};

export default ThemerComponent;
