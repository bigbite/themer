
import {
	__experimentalNavigatorProvider as NavigatorProvider,
	__experimentalNavigatorScreen as NavigatorScreen,
	__experimentalNavigatorButton as NavigatorButton,
	__experimentalNavigatorToParentButton as NavigatorToParentButton,
  } from '@wordpress/components';


export const Navigator = (props) => {
	console.log(props);
		return (
			<div class='themer-nav'>
			<NavigatorProvider initialPath='/'>
			<NavigatorScreen path='/'>
			<NavigatorButton path={`/`} >{'test'}</NavigatorButton>
			</NavigatorScreen>
			<NavigatorScreen path={`/}`}>
			<span class='nav-top'>
			<NavigatorToParentButton>{`<`}</NavigatorToParentButton>
			<p class="themer-nav-title">{'title'}</p>
			</span>
			{/* {renderInputs(value, currentPath)} */}
			</NavigatorScreen>
			</NavigatorProvider>
			</div>
		)

} 

export default Navigator;
	