import Border from './StylesBorder';

/**
 * Individual block item
 *
 * @param {Object} props       Component props
 * @param {Object} props.block Block object
 */
const BlocksItem = ( { block } ) => {
	if ( ! block?.name ) {
		return;
	}

	const blockSelector = [ 'styles', 'blocks', block?.name ];

	return (
		<details className="themer--blocks-item-component">
			<summary>
				<span>
					{ block?.icon?.src }
					{ block?.title }
				</span>
			</summary>
			<div className="themer--blocks-item-component--styles">
				{ block?.supports?.__experimentalBorder && (
					<Border
						settings={ block?.supports?.__experimentalBorder }
						selector={ [ ...blockSelector, 'border' ].join( '.' ) }
					/>
				) }
			</div>
		</details>
	);
};

export default BlocksItem;
