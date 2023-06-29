import { mergeWith, isEmpty } from 'lodash';
import { Button, Spinner } from '@wordpress/components';
import { select, dispatch, subscribe } from '@wordpress/data';
import { useState } from '@wordpress/element';

import Preview from './Preview';
import Fields from './Fields';

/**
 * main component
 */
const ThemerComponent = () => {
	const [ config, setConfig ] = useState();
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
	const getThemeConfig = () => {
		if ( ! userConfig ) {
			return {};
		}

		const baseOptions = {
			styles: baseConfig?.styles,
			// render only layout from settings
			settings: ( ( { layout } ) => ( { layout } ) )(
				baseConfig?.settings
			),
		};
		const userOptions = {
			styles: userConfig?.styles,
			// render only layout from settings
			settings: ( ( { layout } ) => ( { layout } ) )(
				userConfig?.settings
			),
		};
		const merged = mergeBaseAndUserConfigs( baseOptions, userOptions );
		return merged;
	};

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

	if ( isEmpty( config ) )
		return (
			<>
				<Spinner />
			</>
		);

	return (
		<div className="themer-container">
			<div className="themer-preview-container">
				<Preview
					color={ userConfig?.styles?.color }
					font={ userConfig?.styles?.typography }
					elements={ userConfig?.styles?.elements }
				/>
			</div>
			<div className="themer-nav-container">
				<Fields
					baseConfig={ baseConfig }
					sourceObject={ getThemeConfig() }
				/>
				<Button isPrimary onClick={ () => save() } text="Save to db" />
				<Button
					isPrimary
					onClick={ () => reset() }
					text="reset to theme.json"
				/>
			</div>
		</div>
	);
};

export default ThemerComponent;
