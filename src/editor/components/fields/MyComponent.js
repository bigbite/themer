import { BlockEditorProvider, BlockList, privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { unlock } from '../../utils/lock-unlock.js';
import { Button } from '@wordpress/components';
import { useMemo, useState, useEffect, useCallback, useContext } from '@wordpress/element';
import { dispatchContexts, showContexts, themeContexts } from '../ThemeSettings';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { mergeWith } from 'lodash';
import Context  from './Context';

const { useGlobalStylesReset, useGlobalStyle, useGlobalSetting, useGlobalStylesOutput, GlobalStylesContext, ExperimentalBlockEditorProvider } = unlock( blockEditorPrivateApis );
 
import { GlobalStylesUI } from '@wordpress/edit-site/build-module/components/global-styles/';
import { GlobalStylesProvider } from '@wordpress/edit-site/build-module/components/global-styles/global-styles-provider';
import { GlobalStylesRenderer } from '@wordpress/edit-site/build-module/components/global-styles-renderer';
import * as all from '@wordpress/block-editor/build-module/components/global-styles';
import * as all2 from '@wordpress/edit-site/build-module/components/global-styles';

export const MyComponent = () => {

const id = wp.data.select('core').getEntityRecords('root', 'theme', { status: 'active' });
console.log(id);


return (
	
<>
	<ExperimentalBlockEditorProvider >
		<GlobalStylesProvider>
			<GlobalStylesUI 
			/>
			</GlobalStylesProvider>
	</ExperimentalBlockEditorProvider>
</>


)

	
}