import {
	FontSizePicker,
	SelectControl,
	Button,
	__experimentalInputControl as InputControl,
	__experimentalToggleGroupControl as ToggleGroup,
	__experimentalToggleGroupControlOptionIcon as ToggleIcon,
} from '@wordpress/components';

/**
 * returns component for font options
 */
const FontPicker = ( { data, id, value, onChange } ) => {
	/**
	 * returns preset font sizes from theme.json
	 */
	const getFontSizes = () => {
		const sizes = data?.settings?.typography?.fontSizes?.theme;
		return sizes;
	};

	/**
	 * returns preset font families from theme.json
	 */
	const getFontFamilies = () => {
		const fonts = data?.settings?.typography?.fontFamilies?.theme;
		const result = [];
		fonts.forEach( ( item ) => {
			// eslint-disable-next-line no-param-reassign -- remove '-' from slug to use as title
			item.slug = item.slug.replace( /\s+/g, '-' );
			result.push( {
				value: item.slug,
				label: item.name,
			} );
		} );
		return result;
	};

	/**
	 * handles line height incremental input
	 */
	const getLineHeight = ( val, dir ) => {
		let increment;
		if ( dir === 'minus' ) {
			increment = -0.1;
		} else increment = 0.1;
		const number = parseFloat( val );
		const result = parseFloat( number + increment )
			.toFixed( 1 )
			.toString();
		return result;
	};

	switch ( id ) {
		case 'fontSize':
			return (
				<FontSizePicker
					fontSizes={ getFontSizes() }
					value={ value }
					onChange={ ( val ) => onChange( val ) }
				/>
			);
		case 'fontFamily':
			return (
				<SelectControl
					options={ getFontFamilies() }
					value={ value }
					onChange={ ( val ) => onChange( val ) }
				/>
			);
		case 'lineHeight':
			return (
				<InputControl
					value={ value }
					onChange={ ( val ) => onChange( val ) }
					suffix={
						<>
							<Button
								text="+"
								onClick={ () => {
									onChange( getLineHeight( value, 'plus' ) );
								} }
							/>
							<Button
								text="-"
								onClick={ () => {
									onChange( getLineHeight( value, 'minus' ) );
								} }
							/>
						</>
					}
				/>
			);
		case 'textDecoration':
			return (
				<>
					<ToggleGroup
						onChange={ ( val ) => {
							onChange( val );
						} }
					>
						<ToggleIcon value="none" label="none" icon="minus" />
						<ToggleIcon
							value="underline"
							label="Underline"
							icon="editor-underline"
						/>
						<ToggleIcon
							value="line-through"
							label="Strikethrough"
							icon="editor-strikethrough"
						/>
					</ToggleGroup>
				</>
			);
		default:
			return null;
	}
};

export default FontPicker;
