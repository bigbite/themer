/*eslint-disable */

const Preview = (props) => (
  <div className="themerPreviewSquare" style={{ backgroundColor: `${props?.color?.background}` }}>
    <h1
      className="themerPreviewTitle"
      style={{
        color: `${props?.color?.text}`,
        'font-family': `${props?.elements?.h1?.typography?.fontFamily}`,
        'font-size': `${props?.elements?.h1?.typography?.fontSize}`,
        'line-height': `${props?.font?.lineHeight}`,
      }}
    >
      This is a title
    </h1>
    <div
      className="themerPreviewText"
      style={{
        color: `${props?.color?.text}`,
        'font-family': `${props?.font?.fontFamily}`,
        'font-size': `${props?.font?.fontSize}`,
        'line-height': `${props?.font?.lineHeight}`,
      }}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam,
    </div>
    <div className="themerPreviewColours">
      <div className="themerPreviewCircle" />
      <div className="themerPreviewCircle" />
    </div>
  </div>
);

export default Preview;
