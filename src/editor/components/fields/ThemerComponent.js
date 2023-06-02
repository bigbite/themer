import { Button, TextControl, PanelBody } from '@wordpress/components';
import { useState, useContext } from '@wordpress/element';
import SingleField from './Field';
import  CanvasSpinner  from '@wordpress/edit-site/build-module/components/canvas-spinner';
import { mergeWith, isEmpty } from 'lodash';
import Preview from './Preview';
import {
	__experimentalNavigatorProvider as NavigatorProvider,
	__experimentalNavigatorScreen as NavigatorScreen,
	__experimentalNavigatorButton as NavigatorButton,
	__experimentalNavigatorToParentButton as NavigatorToParentButton,
  } from '@wordpress/components';
export const ThemerComponent = () => {
	const [con, setCon ] = useState();

const getGlobalStylesId = () => wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
const getBaseConfig = () => wp.data.select('core').__experimentalGetCurrentThemeBaseGlobalStyles();
const getUserConfig = () => wp.data.select('core').getEditedEntityRecord(
	'root',
	'globalStyles',
	getGlobalStylesId()
);

const baseConfig = getBaseConfig();
const userConfig = getUserConfig();


wp.data.subscribe(() => {
	const newUserConfig = getUserConfig();
	if( userConfig !== newUserConfig ) {
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
const getBase = () => {
	if(!userConfig) {
		return
	}

	const baseOptions = {
		styles: baseConfig.styles,
		// render only layout from settings
		settings: (({layout}) => ({layout}))(baseConfig.settings),
	}
	const userOptions = {

		styles: userConfig.styles,
		// render only layout from settings
		settings: (({layout}) => ({layout}))(userConfig.settings),
	}
	const merged = mergeBaseAndUserConfigs( baseOptions, userOptions);
	return merged;
}

const dataToPass = () => {
	const base = {
		settings: baseConfig.settings
	}

	return base;
}


const renderInputs = (data, path = '', child) => {
	const inputs = Object.entries(data).map(([key, value]) => {
	  if (
		typeof value === "object" && 
		value !== null
	  ) {
	  const currentPath = path + `.${key}`;
	  return (
		<div class={`themer-nav-${child}`}>
		<NavigatorProvider initialPath='/'>
		<NavigatorScreen path='/'>
		<NavigatorButton className='themer-nav-item'path={`/${key}`}>{key}</NavigatorButton>
		</NavigatorScreen>
		<NavigatorScreen path={`/${key}`}>
		<span class='nav-top'>
		<NavigatorToParentButton>{`<`}</NavigatorToParentButton>
		<p class="themer-nav-title">{key}</p>
		</span>
		{renderInputs(value, currentPath, `child`)}
		</NavigatorScreen>
		</NavigatorProvider>
		</div>
	)
  }
  if(typeof value === "string") {
	const currentPath = path;
		return (
			<SingleField 
				  parent={currentPath}
				  id={key}
				  value={value}
				  data={dataToPass()}
		  />
		  );
	}
});
return inputs;
  };

const save = () => {
	wp.data.dispatch('core').undo();
	wp.data.dispatch('core').saveEditedEntityRecord('root', 'globalStyles', getGlobalStylesId());
}

const reset = () => {
	wp.data.dispatch('core').editEntityRecord(
		'root',
		'globalStyles',
		getGlobalStylesId(),
			getBaseConfig()
		);
}

if (isEmpty(con))
return (
	<>
	<CanvasSpinner />
	</>
)

return (
	<div className='themer-container'>
	<div className="themer-preview-container">
	<Preview 
	color={con?.styles?.color}
	font={con?.styles?.typography}
	elements={con?.styles?.elements}
	/>
	</div>
	<div className="themer-nav-container">
	<Button isPrimary onClick={()=>console.log(wp.data.select('core').getEditedEntityRecord('root', 'globalStyles', getGlobalStylesId()))} text='getEntity'/>
	<Button isPrimary onClick={()=>console.log(getBaseConfig())} text='getBase'/>
	{renderInputs(getBase(), '', 'parent')}
	<Button isPrimary onClick={()=>save()} text='Save to db' />
	<Button isPrimary onClick={()=>reset()} text='reset to theme.json' />
	</div>
	</div>
	);
} 
	