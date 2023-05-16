import { Button, TextControl, PanelBody } from '@wordpress/components';
import { useState, useContext } from '@wordpress/element';
import SingleField from './Field';
import  CanvasSpinner  from '@wordpress/edit-site/build-module/components/canvas-spinner';
import { mergeWith, isEmpty } from 'lodash';

export const MyComponent = () => {
	const [con, setCon ] = useState();

const getGlobalStylesId = () => wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
const getBaseConfig = () => wp.data.select('core').__experimentalGetCurrentThemeBaseGlobalStyles();
const getUserConf = () => wp.data.select('core').getEditedEntityRecord(
	'root',
	'globalStyles',
	getGlobalStylesId()
);

const baseConfig = getBaseConfig();
const userConf = getUserConf();


wp.data.subscribe(() => {
	const newUserConfig = getUserConf();
	if( userConf !== newUserConfig ) {
		setCon(newUserConfig);
	}

})

function mergeTreesCustomizer( _, srcValue ) {
	if ( Array.isArray( srcValue ) ) {
		return srcValue;
	}
}

function mergeBaseAndUserConfigs( base, user ) {
	return mergeWith( {}, base, user, mergeTreesCustomizer );
}

const getBase = (val) => {
	const merged = mergeBaseAndUserConfigs( baseConfig?.styles?.color, userConf?.styles?.color );
	return merged;
}

const renderInputs = (data, path = '') => {
	const inputs = Object.entries(data).map(([key, value]) => {
	  if (
		typeof value === "object" && 
		value !== null
	  ) {
	  const currentPath = path + `.${key}`;
		return (
		  <div>
			<PanelBody
			title={ key }
				initialOpen={ true }
			>
			<div class="sub-group">
			  {renderInputs(value, currentPath)}
			</div>
			</PanelBody>
		  </div>
		)
	  }
	  if(typeof value === "string") {
		const currentPath = path;
	  return (
		<div>
		<SingleField 
      		parent={currentPath}
      		id={key}
      		value = {value}
			data={data}
      />
		</div>
	  );
	  }
	});
	return inputs;
  };

const save = () => {
	const globalStylesId = wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
	wp.data.dispatch('core').saveEditedEntityRecord('root', 'globalStyles', globalStylesId);
}

if (isEmpty(con))
return (
	<>
	<CanvasSpinner />
	</>
)

return (
	<>
	{renderInputs(getBase())}
		{/* <TextControl value={con?.styles?.color?.background} onChange={(val) => setCon({
			styles: {
				color: {
					background: val
				}
			}
		})}></TextControl> */}
	<Button onClick={()=>save()} text='Save to db' />
	</>
	);
} 
	