import { mergeWith, isEmpty } from 'lodash';
import { Button, Spinner } from '@wordpress/components';
import { select, dispatch, subscribe } from '@wordpress/data';
import { useEffect, useState, useMemo } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import Preview from './Preview';
import Fields from './Fields';

/**
 * main component
 */
const ThemerComponent = () => {
	const [ config, setConfig ] = useState();
	const [ previewCss, setPreviewCss ] = useState( '' );

	/**
	 * Gets global Styles ID
	 */
	// eslint-disable-next-line no-underscore-dangle -- require underscore dangle for experimental functions
	const getGlobalStylesId = () =>
		select( 'core' ).__experimentalGetCurrentGlobalStylesId();

	/**
	 * Gets base configuration (theme.json)
	 */
	// eslint-disable-next-line no-underscore-dangle -- require underscore dangle for experimental functions
	const getBaseConfig = () =>
		select( 'core' ).__experimentalGetCurrentThemeBaseGlobalStyles();

	/**
	 * Gets user configuration from db
	 */
	// eslint-disable-next-line no-shadow -- require reuse of select
	const getUserConfig = () =>
		select( 'core' ).getEditedEntityRecord(
			'root',
			'globalStyles',
			getGlobalStylesId()
		);

	const baseConfig = getBaseConfig();
	const userConfig = getUserConfig();

	subscribe( () => {
		const newUserConfig = getUserConfig();
		if ( userConfig !== newUserConfig ) {
			setConfig( newUserConfig );
		}
	} );

	/**
	 * merges base and user configs
	 *
	 * @param {Object} base
	 * @param {Object} user
	 */
	const mergeBaseAndUserConfigs = ( base, user ) =>
		mergeWith( {}, base, user );

	/**
	 * returns theme config
	 */
	const themeConfig = useMemo( () => {
		if ( ! userConfig ) {
			return null;
		}

		const baseOptions = {
			styles: baseConfig?.styles,

			settings: {
				layout: baseConfig?.settings?.layout,
			},
		};
		const userOptions = {
			styles: userConfig?.styles,

			settings: {
				layout: userConfig?.settings?.layout,
			},
		};
		const merged = mergeBaseAndUserConfigs( baseOptions, userOptions );
		return merged;
	}, [ userConfig, baseConfig ] );

	/**
	 * Fetch CSS styling rules for live preview based on current theme config
	 */
	useEffect( () => {
		const refreshStyles = async () => {
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
			refreshStyles();
		}
	}, [ themeConfig, setPreviewCss ] );

	/**
	 * saves edited entity data
	 */
	const save = async () => {
		dispatch( 'core' ).undo();
		try {
			await dispatch( 'core' ).saveEditedEntityRecord(
				'root',
				'globalStyles',
				getGlobalStylesId()
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
			getGlobalStylesId(),
			getBaseConfig()
		);
	};

	if ( isEmpty( config ) ) {
		return (
			<>
				<Spinner />
			</>
		);
	}

	return (
		<div className="themer-container">
			<div className="themer-nav">
				<div
					style={ {
						display: 'flex',
						gap: '0.5rem',
						padding: '0.5rem',
					} }
				>
					<Button
						isPrimary
						onClick={ () => save() }
						text="Save to db"
					/>
					<Button
						isPrimary
						onClick={ () => reset() }
						text="reset to theme.json"
					/>
				</div>
				<div className="themer-fields">
					<Fields sourceObject={ themeConfig } />
				</div>
			</div>
			<div className="themer-preview">
				<Preview
					baseOptions={ getBaseConfig() }
					previewCss={ previewCss }
				/>
			</div>
		</div>
	);
};

export default ThemerComponent;
