import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { TextControl, ToggleControl } from '@wordpress/components';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';

/**
 * Reusable shadow control style component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Shadow = ({ selector }) => {
	const { themeConfig } = useContext(EditorContext);
	const { setUserConfig } = useContext(StylesContext);
	const shadowStyles = getThemeOption(selector, themeConfig);

	/**
	 * Handles the user clicking the inset toggle.
	 * @param {boolean} newVal - The new value of the inset toggle.
	 */
	const handleNewInsetValue = (newVal) => {
		const updatedShadowStyles = newVal
			? `inset ${shadowStyles}`
			: shadowStyles.replace('inset', '').trim();
		let config = structuredClone(themeConfig);
		config = set(config, selector, updatedShadowStyles);
		setUserConfig(config);
	};

	/**
	 * Handles the user changing the shadow value.
	 * @param {string} newValue - The new value of the shadow text field.
	 */
	const handleNewValue = (newValue) => {
		let config = structuredClone(themeConfig);
		config = set(config, selector, newValue);
		setUserConfig(config);
	};

	return (
		<>
			<span className="themer--blocks-item-component--styles--title">
				{__('Shadow', 'themer')}
			</span>
			<div className="themer--blocks-item-component--columns themer--blocks-item-component--columns-2">
				<ToggleControl
					checked={shadowStyles.includes('inset')}
					label={__('Inset', 'themer')}
					onChange={(newVal) => handleNewInsetValue(newVal)}
				/>
				<TextControl
					onChange={(newVal) => handleNewValue(newVal)}
					value={shadowStyles}
				/>
			</div>
		</>
	);
};

export default Shadow;
