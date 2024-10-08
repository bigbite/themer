import classNames from 'classnames';

import {
	__experimentalUseNavigator as useNavigator,
	Icon,
} from '@wordpress/components';

/**
 * Breadcrumbs
 */
const NavigatorBreadcrumbs = () => {
	const { location } = useNavigator();

	/**
	 * Get the path segments for the current location and build an array of objects with the name and path for each segment in the location.
	 * This is used to build the breadcrumbs. For example, if the current path is `/blocks/core%2Fparagraph/typography`, the breadcrumbs will be: `Blocks > Paragraph > Typography`.
	 *
	 */
	const paths = location.path.split( '/' ).reduce( ( acc = [], part ) => {
		const name = part
			.split( '%2F' )
			.pop()
			.replaceAll( '-', ' ' )
			.replaceAll( ':', '' );
		const previousPath = acc[ acc.length - 1 ]?.path ?? null;
		const path = previousPath ? previousPath + '/' + part : '/' + part;

		if ( part ) {
			acc.push( { name, path } );
		}
		return acc;
	}, [] );

	return (
		<div className="themer-breadcrumbs">
			{ paths.map( ( { name, path } ) => {
				const current = location.path === path;
				return (
					<div className="themer-breadcrumbs__item" key={ path }>
						<div
							key={ path }
							className={ classNames(
								'themer-breadcrumbs__item__label',
								{
									'themer-breadcrumbs__item__label--active':
										current,
								}
							) }
						>
							{ name }
						</div>
						{ ! current && (
							<Icon
								className="themer-breadcrumbs__item__separator"
								icon="arrow-right-alt2"
								size={ 12 }
							/>
						) }
					</div>
				);
			} ) }
		</div>
	);
};

export default NavigatorBreadcrumbs;
