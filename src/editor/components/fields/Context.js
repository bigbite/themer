import { createContext, useContext } from '@wordpress/element';


const BLOCK_STYLE_ATTRIBUTES = [
	'textColor',
	'backgroundColor',
	'style',
	'color',
	'fontSize',
];

const GlobalStylesContext = createContext({style:{}});
GlobalStylesContext.BLOCK_STYLE_ATTRIBUTES = BLOCK_STYLE_ATTRIBUTES;

export const useGlobalStyles = () => {
	const globalStyles = useContext(GlobalStylesContext);

	return globalStyles;
}


export const Context = (WrappedComponent) => (props) => {
	console.log(style);
	return (
		<GlobalStylesContext.Consumer>
			{(globalStyles)=> {
				<WrappedComponent {...props} globalStyles={globalStyles} />
			}}
		</GlobalStylesContext.Consumer>
	)
}

export default GlobalStylesContext;