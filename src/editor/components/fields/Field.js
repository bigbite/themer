/* eslint no-underscore-dangle: 0 */

import { set, merge } from 'lodash';
import { useState } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';

import ComponentMap from './ComponentMap';

/**
 * main component
 *
 * @param {Object} props
 * @param {string} props.value
 * @param {string} props.path
 * @param {string} props.id
 */
const Field = ( { value, path, id } ) => {
	/**
	 * gets ID for global styles
	 */
	const getGlobalStylesId = () =>
		select( 'core' ).__experimentalGetCurrentGlobalStylesId();
	const [ text, setText ] = useState( value );
	const context = { ...{} };

	/**
	 * updates entity record on field edit
	 *
	 * @param {string} path
	 * @param {*}      newValue
	 */
	const edit = ( path, newValue ) => {
		const current = {
			...select( 'core' ).getEditedEntityRecord(
				'root',
				'globalStyles',
				getGlobalStylesId()
			),
		};
		const updated = set( context, path, newValue );
		const newObj = merge( current, updated );
		dispatch( 'core' ).editEntityRecord(
			'root',
			'globalStyles',
			getGlobalStylesId(),
			{
				styles: newObj.styles || {},
				settings: newObj.settings || {},
			}
		);
	};

	/**
	 * gets field path and value and passes to edit
	 *
	 * @param {Event} e Change event.
	 */
	const onChange = ( e ) => {
		if ( path.charAt( 0 ) === '.' ) {
			path = path.substring( 1 );
		}
		setText( e );
		edit( path, e );
	};
	return (
		<>
			<div className="themer-nav-item">{ id }</div>
			<ComponentMap
				label={ id }
				value={ text || value }
				onChange={ ( val ) => onChange( val ) }
			/>
		</>
	);
};

export default Field;
