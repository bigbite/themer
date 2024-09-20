import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { TabPanel, PanelBody } from '@wordpress/components';

import Border from './StylesBorder';
import Color from './StylesColor';
import Typography from './StylesTypography';
import Filter from './StylesFilter';
import Spacing from './StylesSpacing';
import Dimensions from './StylesDimensions';
import Outline from './StylesOutline';
import Shadow from './StylesShadow';
import CustomCSS from './StylesCustomCSS';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';

/**
 * Block Variation component
 *
 * This component will render the block variations for the given selector.
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Selector for styles object within theme config
 */
const StylesVariations = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );

	if ( ! selector ) {
		return;
	}

	const blockStyles = getThemeOption( selector, themeConfig ) || {};

	const tabs = Object.entries( blockStyles ).map( ( [ name ] ) => {
		return {
			name,
			title: name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
			className: name,
		};
	} );

	return (
		<>
			<span className="themer--styles__item__label">
				{ __( 'Variations', 'themer' ) }
			</span>
			<TabPanel
				className="themer--styles"
				activeClass="active-themer-tab"
				tabs={ tabs }
			>
				{ ( tab ) => (
					<PanelBody>
						<div className="themer--styles__item">
							<Color
								selector={ `${ selector }.${ tab.name }.color` }
							/>
						</div>
						<div className="themer--styles__item">
							<Dimensions
								selector={ `${ selector }.${ tab.name }.dimensions` }
							/>
						</div>
						<div className="themer--styles__item">
							<Border
								selector={ `${ selector }.${ tab.name }.border` }
							/>
						</div>
						<div className="themer--styles__item">
							<Filter
								selector={ `${ selector }.${ tab.name }.filter` }
							/>
						</div>
						<div className="themer--styles__item">
							<Outline
								selector={ `${ selector }.${ tab.name }.outline` }
							/>
						</div>
						<div className="themer--styles__item">
							<Shadow
								selector={ `${ selector }.${ tab.name }.shadow` }
							/>
						</div>
						<div className="themer--styles__item">
							<Spacing
								selector={ `${ selector }.${ tab.name }.spacing` }
							/>
						</div>
						<div className="themer--styles__item">
							<Typography
								selector={ `${ selector }.${ tab.name }.typography` }
							/>
						</div>
						<div className="themer--styles__item">
							<CustomCSS
								selector={ `${ selector }.${ tab.name }.css` }
							/>
						</div>
					</PanelBody>
				) }
			</TabPanel>
		</>
	);
};

export default StylesVariations;
