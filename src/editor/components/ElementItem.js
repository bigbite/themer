import { Button } from '@wordpress/components';
import { useState, useContext, useEffect } from '@wordpress/element';
import { seen, unseen } from '@wordpress/icons';

import Styles from './Styles';

import EditorContext from '../context/EditorContext';
import getBlockFromElement from '../../utils/get-block-from-element';

/**
 * Individual element item
 *
 * @param {Object} props      Component props
 * @param {string} props.name Element name
 * @param {string} props.path Path name
 */
const ElementItem = ( { path, name } ) => {
	const [ isOpen, setIsOpen ] = useState( false );
	const { previewBlocks, setPreviewBlocks, resetPreviewBlocks } =
		useContext( EditorContext );

	/**
	 * Reset the preview when the component is closed
	 */
	useEffect( () => {
		if ( ! isOpen ) {
			resetPreviewBlocks();
		}
	}, [ isOpen ] );

	if ( ! name ) {
		return;
	}

	const example = getBlockFromElement( name );

	/**
	 * The example is active if the preview blocks key matches the element name
	 */
	const isExampleActive = previewBlocks[ 0 ] === name;

	/**
	 * Toggle the preview example for this block on/off
	 * Uses the example defined during block registration to render the preview
	 *
	 * @returns void
	 */
	const toggleExample = () => {
		if ( isExampleActive ) {
			resetPreviewBlocks();
			return;
		}

		setPreviewBlocks( [ name, [ example ] ] );
	};

	return (
		<details
			className="themer--blocks-item-component"
			open={ isOpen }
			onToggle={ () => setIsOpen( ! isOpen ) }
		>
			<summary>{ name }</summary>
			{ isOpen && (
				<div className="themer--blocks-item-component--styles">
					{ example && (
						<div>
							<Button
								onClick={ toggleExample }
								icon={ isExampleActive ? unseen : seen }
								label="Toggle example"
							/>
						</div>
					) }
					<Styles path={ `${ path }.${ name }` } />
				</div>
			) }
		</details>
	);
};

export default ElementItem;
