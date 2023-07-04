/**
 * renders preview element
 *
 * @param {Object} props
 * @param {Object} props.color
 * @param {Object} props.elements
 * @param {Object} props.font
 */
const Preview = ( { color, elements, font } ) => (
	<div
		className="themer-preview-square"
		style={ { backgroundColor: `${ color?.background }` } }
	>
		<h1
			className="themer-preview-title"
			style={ {
				color: `${ color?.text }`,
				'font-family': `${ elements?.h1?.typography?.fontFamily }`,
				'font-size': `${ elements?.h1?.typography?.fontSize }`,
				'line-height': `${ font?.lineHeight }`,
			} }
		>
			This is a title
		</h1>
		<div
			className="themer-preview-text"
			style={ {
				color: `${ color?.text }`,
				'font-family': `${ font?.fontFamily }`,
				'font-size': `${ font?.fontSize }`,
				'line-height': `${ font?.lineHeight }`,
			} }
		>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
			eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
			ad minim veniam,
		</div>
		<div className="themer-preview-colours">
			<div className="themer-preview-circle" />
			<div className="themer-preview-circle" />
		</div>
	</div>
);

export default Preview;
