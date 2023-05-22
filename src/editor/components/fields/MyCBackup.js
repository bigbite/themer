import { Button, PanelBody, Panel, TabPanel } from '@wordpress/components';
import {
	__experimentalNavigatorProvider as NavigatorProvider,
	__experimentalNavigatorScreen as NavigatorScreen,
	__experimentalNavigatorButton as NavigatorButton,
	__experimentalNavigatorToParentButton as NavigatorToParentButton,
  } from '@wordpress/components';
import { useState } from '@wordpress/element';
import SingleField from './Field';
import Preview from './Preview';
import  CanvasSpinner  from '@wordpress/edit-site/build-module/components/canvas-spinner';
import { mergeWith } from 'lodash';

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

	if (!user ){
		 return {};
	}
	return mergeWith( {}, base, user, mergeTreesCustomizer );
}

const getBase = (val) => {
	const merged = mergeBaseAndUserConfigs( baseConfig, userConf );
	return merged;
}

const navOnClick = (yep) => {
console.log(yep)
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
	const globalStylesId = wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
	console.log(wp.data.select('core').getEditedEntityRecord('root', 'globalStyles', globalStylesId))
	wp.data.dispatch('core').saveEditedEntityRecord('root', 'globalStyles', globalStylesId);
}



if (!con)
return (
	<>
	<CanvasSpinner />
	</>
)

return (
	<>
	<Preview 
	background={con?.styles?.color?.background}
	/>
	{renderInputs(getBase())}
	<Button onClick={()=>save()} text='Save to db' />
	<Button onClick={()=>reset()} text='Reset' />
	</>
	);
} 
	