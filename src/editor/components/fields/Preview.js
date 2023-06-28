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
		className="themerPreviewSquare"
		style={ { backgroundColor: `${ color?.background }` } }
	>
		<h1
			className="themerPreviewTitle"
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
			className="themerPreviewText"
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
		<div className="themerPreviewColours">
			<div className="themerPreviewCircle" />
			<div className="themerPreviewCircle" />
		</div>
	</div>
);

export default Preview;
