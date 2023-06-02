const Preview = (props) => {
	return (
		<div className="themerPreviewSquare" style={{backgroundColor:`${props?.color?.background}`}}>
			<h1 className='themerPreviewTitle' style={{
				'color':`${props?.color?.text}`,
				'font-family':`${props?.elements?.h1?.typography?.fontFamily}`, 
				'font-size' : `${props?.elements?.h1?.typography?.fontSize}`,
				'line-height': `${props?.font?.lineHeight}`, 
			}}>This is a title</h1>
			<div className="themerPreviewText" style={{ 
				'color':`${props?.color?.text}`, 
				'font-family':`${props?.font?.fontFamily}`, 
				'font-size' : `${props?.font?.fontSize}`,
				'line-height': `${props?.font?.lineHeight}`,
				}}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
			sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
			Ut enim ad minim veniam, 
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
			Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
			Excepteur sint occaecat cupidatat non proident, 
			sunt in culpa qui officia deserunt mollit anim id est laborum.
			</div>
			<div className="themerPreviewColours">
				<div className="themerPreviewCircle"></div>
				<div className="themerPreviewCircle"></div>
			</div>
		</div>
	)
}

export default Preview;