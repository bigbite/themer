import { BlockEditorProvider, BlockList, privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { unlock } from '../../utils/lock-unlock.js';
import { Button, TextControl, PanelBody } from '@wordpress/components';
import { useMemo, useState, useEffect, useCallback, useContext } from '@wordpress/element';
import { dispatchContexts, showContexts, themeContexts } from '../ThemeSettings';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { mergeWith, isEmpty } from 'lodash';
import { cleanEmptyObject } from '../../utils/clean-empty-object.js';

const { useGlobalStylesReset, useGlobalStyle, useGlobalSetting, useGlobalStylesOutput, GlobalStylesContext, ExperimentalBlockEditorProvider } = unlock( blockEditorPrivateApis );
 
import { GlobalStylesUI } from '@wordpress/edit-site/build-module/components/global-styles/';
import { GlobalStylesProvider } from '@wordpress/edit-site/build-module/components/global-styles/global-styles-provider';
import { GlobalStylesRenderer } from '@wordpress/edit-site/build-module/components/global-styles-renderer';
import * as all from '@wordpress/block-editor/build-module/components/global-styles';
import * as all2 from '@wordpress/edit-site/build-module/components/global-styles';
import  CanvasSpinner  from '@wordpress/edit-site/build-module/components/canvas-spinner';

function mergeTreesCustomizer( _, srcValue ) {
	// We only pass as arrays the presets,
	// in which case we want the new array of values
	// to override the old array (no merging).
	if ( Array.isArray( srcValue ) ) {
		return srcValue;
	}
}

function mergeBaseAndUserConfigs( base, user ) {
	return mergeWith( {}, base, user, mergeTreesCustomizer );
}

function useGlobalStylesUserConfig() {
	const { globalStylesId, isReady, settings, styles } = useSelect(
		( select ) => {
			const { getEditedEntityRecord, hasFinishedResolution } =
				select( coreStore );
			const _globalStylesId =
				select( coreStore ).__experimentalGetCurrentGlobalStylesId() || wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
				console.log();
			const record = _globalStylesId
				? getEditedEntityRecord(
						'root',
						'globalStyles',
						_globalStylesId
				  )
				: undefined;
			let hasResolved = false;
			if (
				hasFinishedResolution(
					'__experimentalGetCurrentGlobalStylesId'
				)
			) {
				hasResolved = _globalStylesId
					? hasFinishedResolution( 'getEditedEntityRecord', [
							'root',
							'globalStyles',
							_globalStylesId,
					  ] )
					: true;
			}

			return {
				globalStylesId: _globalStylesId,
				isReady: hasResolved,
				settings: record?.settings,
				styles: record?.styles,
			};
		},
		[]
	);

	const { getEditedEntityRecord } = useSelect( coreStore );
	const { editEntityRecord } = useDispatch( coreStore );
	const config = useMemo( () => {
		return {
			settings: settings ?? {},
			styles: styles ?? {},
		};
	}, [ settings, styles ] );

	const setConfig = useCallback(
		( callback, options = {} ) => {
			const record = wp.data.select('core').getEditedEntityRecord(
				'root',
				'globalStyles',
				globalStylesId
			);
				console.log(record);
			const currentConfig = {
				styles: record?.styles ?? {},
				settings: record?.settings ?? {},
			};
			const updatedConfig = callback( currentConfig );
			wp.data.dispatch(coreStore).editEntityRecord(
				'root',
				'globalStyles',
				globalStylesId,
				{
					styles: cleanEmptyObject( updatedConfig.styles ) || {},
					settings: cleanEmptyObject( updatedConfig.settings ) || {},
				},
				options
			);
		},
		[ globalStylesId ]
	);

	return [ isReady, config, setConfig ];
}

const useGlobalStylesBaseConfig = () => {
	// const baseConfig = useSelect( ( select ) => {
	// 	return select(
	// 		coreStore
	// 	).__experimentalGetCurrentThemeBaseGlobalStyles();
	// }, [] );

	//returning null using above current method, gets value using below.
	const baseConfig = wp.data.select('core').__experimentalGetCurrentThemeBaseGlobalStyles();

	return [ !! baseConfig, baseConfig ];
}

function useGlobalStylesContext() {
	console.log('run');
	const [ isUserConfigReady, userConfig, setUserConfig ] =
		useGlobalStylesUserConfig();
	const [ isBaseConfigReady, baseConfig ] = useGlobalStylesBaseConfig();

	const mergedConfig = useMemo( () => {
		if ( ! baseConfig || ! userConfig ) {
			return {};
		}
		return mergeBaseAndUserConfigs( baseConfig, userConfig );
	}, [ userConfig, baseConfig ] );
	const context = useMemo( () => {
		return {
			isReady: isUserConfigReady && isBaseConfigReady,
			user: userConfig,
			base: baseConfig,
			merged: mergedConfig,
			setUserConfig,
		};
	}, [
		mergedConfig,
		userConfig,
		baseConfig,
		setUserConfig,
		isUserConfigReady,
		isBaseConfigReady,
	] );

	return context;
}

const getBase = () => {
	const globalStylesId = wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
	const baseConfig = wp.data.select('core').__experimentalGetCurrentThemeBaseGlobalStyles();
	const userConfig =  wp.data.select('core').getEditedEntityRecord(
		'root',
		'globalStyles',
		globalStylesId
	);
	const merged = mergeBaseAndUserConfigs( baseConfig, userConfig );
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
		console.log(currentPath);
	  return (
		<div>
			{key}
		<TextControl
		id={key}
		value = {value}
		onChange={(v)=> setCon({currentPath})}
		/>
		</div>
	  );
	  }
	});
	return inputs;
  };



export const MyComponent = () => {
const [ready, setReady ] = useState(false);
const [con, setCon ] = useState();

const context = useGlobalStylesContext();

const run = () => {
	const globalStylesId = wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
	const data = wp.data.select('core').getEditedEntityRecord('root', 'globalStyles', globalStylesId);
	setCon(data);
	console.log(con);
	console.log(getBase())
}


const save = () => {
	const globalStylesId = wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
	wp.data.dispatch(coreStore).editEntityRecord(
		'root',
		'globalStyles',
		globalStylesId,
		con

	);
	wp.data.dispatch(coreStore).saveEditedEntityRecord('root', 'globalStyles', globalStylesId);
	run();
}

if (context && context.isReady) {
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
	<Button onClick={()=>run()} text='re render'/>
	<Button onClick={()=>save()} text='Save to db' />

	</>
	);
}

return (
	<>
	<CanvasSpinner />
	{console.log(context)}
	<Button onClick={()=>run()} text='re render'/>
	</>
	)
} 
	