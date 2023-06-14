const { TextControl, ColorPicker } =
  wp.components;

import FontPicker from './Components/FontPicker';
import SpacingControl from './Components/SpacingControl';

const ComponentMap = (props) => {
	const colorPickerArray = ['background', 'text'];
	const fontPickerArray = ['fontFamily', 'fontSize', 'lineHeight', 'textDecoration'];
	const blockGapArray  = ['blockGap', 'top', 'right', 'bottom', 'left'];

	switch(true) {
		case colorPickerArray.includes(props.label) :
			return (
			<ColorPicker defaultValue={props.value} onChange={(val)=>props.onChange(val)}/>
			)
		case fontPickerArray.includes(props.label) :
			return (
			<div class='themer-nav-fontpicker'>
			<FontPicker id={props.label} value={props.value} onChange={(val)=>props.onChange(val)} data={props.data} />
			</div>
			)
		case blockGapArray.includes(props.label) :
			return (
				<SpacingControl id={props.label} value={props.value} onChange={(val)=>props.onChange(val)} data={props.data}/>
			)
		default: 
			return (
			<TextControl value={props.value} onChange={(val)=>props.onChange(val)}/>
			)
	}
}

export default ComponentMap;