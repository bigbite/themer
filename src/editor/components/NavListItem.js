import classNames from 'classnames';
import {
	__experimentalUseNavigator as useNavigator,
	Button,
	Icon,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Nav List Item
 *
 * @param {Object}      props           Component props
 * @param {JSX.Element} props.children  Child elements
 * @param {string}      props.icon      Item icon
 * @param {Object}      props.label     Item label
 * @param {string}      props.route     Navigation route this item should link to
 * @param {boolean}     props.hasStyles Whether or not this item has styles
 */
const NavListItem = ( { children, icon, label, route, hasStyles } ) => {
	const [ isOpen, setIsOpen ] = useState( false );
	const { goTo, location } = useNavigator();

	const handleClick = () => {
		if ( route ) goTo( route );
	};

	const handleExpandClick = ( event ) => {
		event.stopPropagation();
		setIsOpen( ( prev ) => ! prev );
	};

	const isActive = location.path === route;

	const renderIcon = () => {
		if ( ! children ) {
			return null;
		}
		if ( isOpen ) {
			return 'arrow-down-alt2';
		}
		return 'arrow-right-alt2';
	};

	return (
		<li className="themer-nav-list__item">
			<Button
				onClick={ handleClick }
				iconSize={ 12 }
				className={ classNames( 'themer-nav-list__item__button', {
					'themer-nav-list__item__button--active': isActive,
					'themer-nav-list__item__button--disabled': ! hasStyles,
				} ) }
			>
				<Button
					onClick={ handleExpandClick }
					icon={ renderIcon() }
					iconSize={ 12 }
					className="themer-nav-list__item__toggle"
				/>
				<div className="themer--nav-list__item__label">
					<Icon
						icon={ icon }
						size={ 20 }
						style={ { marginRight: '8px' } }
					/>
					{ label }
				</div>
			</Button>

			{ isOpen && <div>{ children }</div> }
		</li>
	);
};

export default NavListItem;
