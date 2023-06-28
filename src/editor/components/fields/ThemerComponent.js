/**
 * This component requires use of experimental apis
 */

/* eslint-disable @wordpress/no-unsafe-wp-apis */

import { mergeWith, isEmpty } from 'lodash';
import {
	Button,
	Spinner,
	__experimentalNavigatorProvider as NavigatorProvider,
	__experimentalNavigatorScreen as NavigatorScreen,
	__experimentalNavigatorButton as NavigatorButton,
	__experimentalNavigatorToParentButton as NavigatorToParentButton,
} from '@wordpress/components';
import { select, dispatch, subscribe } from '@wordpress/data';
import { useState } from '@wordpress/element';

import Preview from './Preview';
import SingleField from './Field';

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
	const getBase = () => {
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
	 * returns base config settings for preset values
	 */
	const dataToPass = () => {
		const base = {
			settings: baseConfig?.settings,
		};

		return base;
	};

	/**
	 * loops over theme config and returns fields
	 *
	 * @param {Object} data
	 * @param {string} path
	 * @param {string} child
	 */
	const renderInputs = ( data, path = '', child ) => {
		const inputs = Object.entries( data ).map( ( [ key, value ] ) => {
			if ( typeof value === 'object' && value !== null ) {
				const currentPath = `${ path }.${ key }`;
				return (
					<div
						key={ currentPath }
						className={ `themer-nav-${ child }` }
					>
						<NavigatorProvider initialPath="/">
							<NavigatorScreen path="/">
								<NavigatorButton
									className="themer-nav-item"
									path={ `/${ key }` }
								>
									{ key }
								</NavigatorButton>
							</NavigatorScreen>
							<NavigatorScreen path={ `/${ key }` }>
								<span className="nav-top">
									<NavigatorToParentButton>{ `<` }</NavigatorToParentButton>
									<p className="themer-nav-title">{ key }</p>
								</span>
								{ renderInputs( value, currentPath, `child` ) }
							</NavigatorScreen>
						</NavigatorProvider>
					</div>
				);
			}
			if ( typeof value === 'string' ) {
				const currentPath = path;
				return (
					<SingleField
						key={ currentPath }
						parent={ currentPath }
						id={ key }
						value={ value }
						data={ dataToPass() }
					/>
				);
			}
			return value;
		} );
		return inputs;
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
				{ renderInputs( getBase(), '', 'parent' ) }
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
