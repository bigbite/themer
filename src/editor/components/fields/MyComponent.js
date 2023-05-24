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
export const MyComponent = () => {
	const [con, setCon ] = useState();

const getGlobalStylesId = () => wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
const getBaseConfig = () => wp.data.select('core').__experimentalGetCurrentThemeBaseGlobalStyles();
const getUserConf = () => wp.data.select('core').getEditedEntityRecord(
	'root',
	'globalStyles',
	getGlobalStylesId()
);

console.log(getGlobalStylesId());

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

const navOnClick = (yep) => {
	console.log(yep)
	}

const getBase = () => {
	if(!userConf) {return}
	const updatedB = {
		styles: baseConfig.styles,
		settings: baseConfig.settings,
	}

	const updatedU = {
		styles: userConf.styles,
		settings: userConf.settings,
	}
	const merged = mergeBaseAndUserConfigs( updatedB, updatedU);
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
		<div class='themer-nav'>
		<NavigatorProvider initialPath='/'>
		<NavigatorScreen path='/'>
		<NavigatorButton path={`/${key}`} onClick={navOnClick}>{key}</NavigatorButton>
		</NavigatorScreen>
		<NavigatorScreen path={`/${key}`}>
		<span class='nav-top'>
		<NavigatorToParentButton>{`<`}</NavigatorToParentButton>
		<p class="themer-nav-title">{key}</p>
		</span>
		{renderInputs(value, currentPath)}
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
	<>
	<Button onClick={()=>console.log(wp.data.select('core').getEditedEntityRecord('root', 'globalStyles', getGlobalStylesId()))} text='getEntity'/>

	<Preview 
	background={con?.styles?.color?.background}
	textColor={con?.styles?.color?.text}
	/>
	{renderInputs(getBase())}
	<Button onClick={()=>save()} text='Save to db' />
	<Button onClick={()=>reset()} text='reset to theme.json' />
	</>
	);
} 
	