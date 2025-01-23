import { createReduxStore, register } from '@wordpress/data';

const DEFAULT_STATE = {
	colourViolations: [],
};

const store = createReduxStore( 'bigbite/themer', {
	actions: {
		setColourViolations: ( colourViolations ) => ( {
			type: 'SET_COLOUR_VIOLATIONS',
			colourViolations,
		} ),
	},
	reducer: ( state = DEFAULT_STATE, action ) => {
		switch ( action.type ) {
			case 'SET_COLOUR_VIOLATIONS':
				return {
					...state,
					colourViolations: action.colourViolations,
				};
		}
		return state;
	},
	selectors: {
		getColourViolations: ( state ) => state.colourViolations,
	},
} );

register( store );
