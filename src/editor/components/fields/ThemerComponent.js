import { mergeWith, isEmpty } from 'lodash';
import { Button, Spinner } from '@wordpress/components';
import { useSelect, dispatch } from '@wordpress/data';
import { useEffect, useState, useMemo } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import Preview from './Preview';
import Fields from './Fields';
import ThemerNotice from '../ThemerNotice';

/**
 * main component
 */
const ThemerComponent = () => {
	const [ previewCss, setPreviewCss ] = useState( '' );
	const [ validThemeJson, setValidThemeJson ] = useState();

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
	 * Check if a valid theme.json is loaded.
	 */
	useEffect( async () => {
		const res = await apiFetch( {
			path: '/themer/v1/theme-json-loaded',
			method: 'GET',
		} );
		setValidThemeJson( res );
	}, [] );

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
		dispatch( 'core' ).undo();
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

	if ( ! themeConfig || ! previewCss ) {
		return (
			<>
				<Spinner />
			</>
		);
	}

	return (
		<div className="themer-container">
			<ThemerNotice
				status={ validThemeJson?.error_type }
				message={ validThemeJson?.message }
			/>
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
				{ validThemeJson === true && (
					<div className="themer-fields">
						<Fields sourceObject={ themeConfig } />
					</div>
				) }
			</div>
			<div className="themer-preview">
				<Preview baseOptions={ baseConfig } previewCss={ previewCss } />
			</div>
		</div>
	);
};

export default ThemerComponent;
