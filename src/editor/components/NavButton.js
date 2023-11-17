import { Button, Icon } from '@wordpress/components';

/**
 * Nav Button
 *
 * @param {Object}      props          Component props
 * @param {JSX.Element} props.children Child elements
 */
const NavButton = ( { children, ...props } ) => {
	return (
		<Button { ...props } className="themer--nav-button" variant="tertiary">
			<span>{ children }</span>
			<Icon
				className="themer--nav-button__arrow"
				icon="arrow-right-alt2"
				size={ 12 }
			/>
		</Button>
	);
};

export default NavButton;
