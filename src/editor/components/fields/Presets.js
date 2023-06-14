import { TextControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element'
import { set, merge } from 'lodash';


const Presets = (props) => {
	const [expand, setExpand] = useState(false);
	const [name, setName] = useState();
	const [value, setValue] = useState();
	const [slug, setSlug] = useState();
	const getGlobalStylesId = () => wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
	const context = {...{}};

	const save = () => {
		const current = {...wp.data.select('core').getEditedEntityRecord('root', 'globalStyles', getGlobalStylesId())};
		const base = props.data;

		let path = props.path;
		if (path.charAt(0)==='.') {
			path = path.substring(1);
		}

		const getAmount = (obj, path) => {
			var current = obj;
			path.split('.').forEach(function(p){
				current = current[p]
			});

			return current.default;
		}

		const level = Object.keys(getAmount(base, path)).length;

		const updated = set(context, path, {
			default :{
			[level] : {
				name: name,
				shadow: value,
				slug: slug
			}
		}
		});

		const newObj = merge(current, updated)
		console.log(newObj);

		wp.data.dispatch('core').editEntityRecord(
			'root',
			'globalStyles',
			getGlobalStylesId(),
			newObj
		);
		console.log(wp.data.select('core').getEditedEntityRecord('root', 'globalStyles', getGlobalStylesId()));
	}
return (
		<>		
		<Button icon="plus" onClick={()=>setExpand(true)}/>
		{expand && (
		<>
		<TextControl name="name" label="name" onChange={(e)=>setName(e)} />
		<TextControl name="slug" label="slug" onChange={(e)=>setSlug(e)}/>
		<TextControl name="value" label="value" onChange={(e)=>setValue(e)}/>
		<Button text='Save' onClick={()=>save()} />
		</>
		)}
		</>
)
}

export default Presets;