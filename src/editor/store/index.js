import { createReduxStore, register } from '@wordpress/data';

const DEFAULT_STATE = {
	themeConfigColours: {},
};

const store = createReduxStore( 'bigbite/themer', {
	actions: {
		setThemeConfigColours: ( themeConfigColours ) => {
			return {
				type: 'SET_THEME_CONFIG_COLOURS',
				themeConfigColours,
			};
		},
	},
	reducer: ( state = DEFAULT_STATE, action ) => {
		switch ( action.type ) {
			case 'SET_THEME_CONFIG_COLOURS':
				return {
					...state,
					themeConfigColours: action.themeConfigColours,
				};
		}
		return state;
	},
	selector: {
		getThemeConfigColours: ( state ) => state.themeConfigColours,
	},
} );

register( store );
