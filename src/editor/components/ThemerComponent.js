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
import ResponsiveButton from './ResponsiveButton';
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
				globalStylesId: currentGlobalStylesId, // eslint-disable no-underscore-dangle -- require underscore dangle for experimental functions
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

	if ( ! themeConfig || ! previewCss || ! globalStylesId ) {
		return (
			<>
				<Spinner />
			</>
		);
	}

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
											<div className="themer-preview">
												<ResponsiveButton
													setPreviewSize={
														setPreviewSize
													}
													previewSize={ previewSize }
												/>
												<Preview
													baseOptions={ baseConfig }
													previewCss={ previewCss }
													previewSize={ previewSize }
												/>
											</div>
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
