import { mergeWith, isEmpty, isEqual } from 'lodash';
import {
	Button,
	Spinner,
	TabPanel,
	MenuGroup,
	MenuItem,
} from '@wordpress/components';
import { useSelect, dispatch } from '@wordpress/data';
import { useEffect, useState, useMemo } from '@wordpress/element';
import { MoreMenuDropdown } from '@wordpress/interface';
import apiFetch from '@wordpress/api-fetch';
import { trash } from '@wordpress/icons';

import Blocks from './Blocks';
import Layout from './Layout';
import Colours from './Colours';
import Preview from './Preview';
import Typography from './Typography';
import CustomBlocks from './CustomBlocks';
import ButtonExport from './ButtonExport';
import ResponsiveButton from './ResponsiveButton';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';
import fetchSchema from '../../utils/schema-helpers';
import ThemerNotice from './ThemerNotice';

import useDebouncedApiFetch from '../../hooks/useDebouncedApiFetch';
import { __ } from '@wordpress/i18n';

/**
 * main component
 */
const ThemerComponent = () => {
	const [ previewSize, setPreviewSize ] = useState();
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

	if ( ! themeConfig || ! previewCss ) {
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
										>
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
											>
												{ __(
													'Clear all customisations',
													'themer'
												) }
											</MenuItem>
											<ButtonExport />
										</MenuGroup>
									) }
								</MoreMenuDropdown>
							</div>
							<div className="themer-body">
								<div className="themer-nav-container">
									<TabPanel
										className="themer-tab-panel"
										activeClass="active-themer-tab"
										tabs={ [
											{
												name: 'typography',
												title: 'Typography',
											},
											{
												name: 'colours',
												title: 'Colours',
											},
											{
												name: 'layout',
												title: 'Layout',
											},
											{
												name: 'blocks',
												title: 'Blocks',
											},
											{
												name: 'custom-blocks',
												title: 'Custom Blocks',
											},
										] }
									>
										{ ( tab ) => {
											switch ( tab?.name ) {
												case 'colours':
													return <Colours />;
												case 'layout':
													return <Layout />;
												case 'blocks':
													return <Blocks />;
												case 'custom-blocks':
													return <CustomBlocks />;
												case 'typography':
												default:
													return <Typography />;
											}
										} }
									</TabPanel>
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
								</div>
							</div>
						</>
					) }
				</StylesContext.Provider>
			</EditorContext.Provider>
		</>
	);
};

export default ThemerComponent;
