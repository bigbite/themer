import { mergeWith, isEmpty, isEqual } from 'lodash';
import { Button, Spinner, TabPanel } from '@wordpress/components';
import { useSelect, dispatch } from '@wordpress/data';
import { useEffect, useState, useMemo } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

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

/**
 * main component
 */
const ThemerComponent = () => {
	const [ previewSize, setPreviewSize ] = useState();
	const [ schema, setSchema ] = useState( {} );
	const [ validThemeJson, setValidThemeJson ] = useState();
	const [ isDirty, setIsDirty ] = useState( false );

	const setUserConfig = ( config ) => {
		setIsDirty( true );
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
	 * Returns if the user config is different from the base config.
	 */
	const userConfigHasChanges = useMemo( () => {
		return ! isEqual(
			{ ...userConfig?.settings, ...userConfig?.styles },
			{ ...baseConfig?.settings, ...baseConfig?.styles }
		);
	}, [ userConfig, baseConfig ] );

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
		window.onbeforeunload = isDirty ? () => isDirty : null;

		return () => {
			window.removeEventListener( 'beforeunload', () => {} );
		};
	}, [ isDirty ] );

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
			setIsDirty( false );
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
		setIsDirty( false );
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
									disabled={
										! userConfigHasChanges && ! isDirty
									}
								/>
								<Button
									isPrimary
									onClick={ () => save() }
									text="Save"
									disabled={ ! isDirty }
								/>
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
									<ButtonExport />
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
