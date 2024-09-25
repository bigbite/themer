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

	const handleSettingsClick = () => {
		if ( route ) goTo( `${ route }/settings` );
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
			<div
				className={ classNames( 'themer-nav-list__item__content', {
					'themer-nav-list__item__content--active': isActive,
					'themer-nav-list__item__content--disabled': ! hasStyles,
				} ) }
			>
				{ children && (
					<Button
						onClick={ handleExpandClick }
						icon={ renderIcon() }
						iconSize={ 12 }
						className="themer-nav-list__item__toggle"
					/>
				) }
				<Button
					onClick={ handleClick }
					iconSize={ 12 }
					className="themer-nav-list__item__button"
				>
					<div className="themer--nav-list__item__label">
						<Icon
							icon={ icon }
							size={ 20 }
							style={ { marginRight: '8px' } }
						/>
						{ label }
					</div>
				</Button>
				<Button onClick={ handleSettingsClick }>{ 'Settings' }</Button>
			</div>

			{ isOpen && (
				<div className="themer-nav-list__item__children">
					{ children }
				</div>
			) }
		</li>
	);
};

export default NavListItem;
