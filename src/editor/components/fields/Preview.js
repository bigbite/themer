const Preview = (props) => {
	return (
		<div className="themerPreviewSquare" style={{backgroundColor:`${props.background}`}}>
			<div className="themerPreviewText" style={{color:`${props.textColor}`}}>Aa</div>
			<div className="themerPreviewColours">
				<div className="themerPreviewCircle"></div>
				<div className="themerPreviewCircle"></div>
			</div>
		</div>
	)
}

export default Preview;