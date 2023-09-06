import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import {
	ToggleControl,
	__experimentalUnitControl as UnitControl,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
	ColorPalette,
} from '@wordpress/components';

import { isHex } from '../../utils/block-helpers';
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
	const themePalette = getThemeOption(
		'settings.color.palette.theme',
		themeConfig
	);

	const LENGTH_REG = /^[0-9]+[a-zA-Z%]+?$/;
	const isCssUnit = (value) =>
		(value === '0' || LENGTH_REG.test(value)) && value !== 'inset';

	const shadowStylesArray = shadowStyles.split(' ');
	const shadowValues = shadowStylesArray.filter(isCssUnit).slice(0, 4);
	const shadowColor = shadowStylesArray.find(
		(value) => !isCssUnit(value) && value !== 'inset'
	);
	const shadowObj = {
		inset: shadowStyles.includes('inset') ? 'inset' : '',
		offsetX: shadowValues?.[0] || '0px',
		offsetY: shadowValues?.[1] || '0px',
		blurRadius: shadowValues?.[2] || '0px',
		spreadRadius: shadowValues?.[3] || '0px',
		color: shadowColor || '#000',
	};

	/**
	 * Handles the user changing one of the values in the box shadow.
	 * @param {boolean} newVal - The new value of the setting.
	 * @param {string} key - The key of the value being changed.
	 */
	const handleNewValue = (newVal, key) => {
		if (key === 'inset') {
			shadowObj[key] = newVal ? 'inset' : '';
		} else {
			shadowObj[key] = newVal;
		}
		const updatedShadowStyles = Object.values(shadowObj).join(' ').trim();

		let config = structuredClone(themeConfig);
		config = set(config, selector, updatedShadowStyles);
		setUserConfig(config);
	};

	return (
		<>
			<span className="themer--blocks-item-component--styles--title">
				{__('Shadow', 'themer')}
			</span>
			<VStack>
				<ToggleControl
					checked={shadowStyles.includes('inset')}
					label={__('Inset', 'themer')}
					onChange={(newVal) => handleNewValue(newVal, 'inset')}
				/>
				<HStack>
					<UnitControl
						label={__('Offset X', 'themer')}
						value={shadowValues?.[0] || '0px'}
						onChange={(newVal) => handleNewValue(newVal, 'offsetX')}
					/>
					<UnitControl
						label={__('Offset Y', 'themer')}
						value={shadowValues?.[1] || '0px'}
						onChange={(newVal) => handleNewValue(newVal, 'offsetY')}
					/>
				</HStack>
				<HStack>
					<UnitControl
						label={__('Blur radius', 'themer')}
						value={shadowValues?.[2] || '0px'}
						onChange={(newVal) =>
							handleNewValue(newVal, 'blurRadius')
						}
					/>
					<UnitControl
						label={__('Spread radius', 'themer')}
						value={shadowValues?.[3] || '0px'}
						onChange={(newVal) =>
							handleNewValue(newVal, 'spreadRadius')
						}
					/>
				</HStack>
				<ColorPalette
					label={__('Shadow Colour', 'themer')}
					colors={themePalette}
					onChange={(newVal) => handleNewValue(newVal, 'color')}
					value={
						shadowColor && isHex(shadowColor) ? shadowColor : '#000'
					}
				/>
			</VStack>
		</>
	);
};

export default Shadow;
