import { BlockEditorProvider, BlockList, privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { unlock } from '../../utils/lock-unlock.js';
import { Button } from '@wordpress/components';
import { useMemo, useState, useEffect } from '@wordpress/element';
import { dispatchContexts, showContexts, themeContexts } from '../ThemeSettings';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

// const { useGlobalStylesReset, useGlobalStyle, useGlobalSetting, useGlobalStylesOutput, GlobalStylesContext } = unlock( blockEditorPrivateApis );
 
import { GlobalStylesUI } from '@wordpress/edit-site/build-module/components/global-styles/';
import { mergeBaseAndUserConfigs, useGlobalStylesContext } from '@wordpress/edit-site/build-module/components/global-styles/global-styles-provider';
import { useGlobalStylesReset, useGlobalStyle, useGlobalSetting, useGlobalStylesOutput, GlobalStylesContext } from '@wordpress/block-editor/build-module/components/global-styles';
import * as all from '@wordpress/block-editor/build-module/components/global-styles';
import * as all2 from '@wordpress/edit-site/build-module/components/global-styles';

const { ExperimentalBlockEditorProvider } = unlock(
	blockEditorPrivateApis
);

export default { title: 'EditSite/GlobalStylesUI' };

export const MyComponent = () => {
	// console.log(all);

	// console.log(unlock(blockEditorPrivateApis));
	const { theme, setTheme } = themeContexts();
	const [ styles, settings ] = useGlobalStylesOutput();

	if( !theme ) {
		return;
	}

	let BASE_SETTINGS =  {
		settings: settings,
		styles: styles,
	
	};

	const [ userGlobalStyles, setUserStyles ] = useState( 	{
		settings: {},
		styles: {} 
	});

	const context =  {
			user: userGlobalStyles,
			base: BASE_SETTINGS,
			merged: mergeBaseAndUserConfigs( BASE_SETTINGS, userGlobalStyles ),
			setUserConfig: userGlobalStyles,
		};


return (
	
<>
	<ExperimentalBlockEditorProvider >
		<GlobalStylesContext.Provider value={context}>

			<GlobalStylesUI 
			isStyleBookOpened={false}
			onCloseStyleBook={()=>{}}
			/>

		</GlobalStylesContext.Provider>
	</ExperimentalBlockEditorProvider>

	</>


)


	
}