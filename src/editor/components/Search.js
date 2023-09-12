/**
 * Search component
 *
 * @param {Object}   props             Component props
 * @param {Function} props.setValue    Input on change function
 * @param {string}   props.placeholder Placeholder attribute value
 */
const Search = ( { setValue, placeholder = 'Search' } ) => {
	const handleSearch = ( event ) => {
		setValue( event?.target?.value?.toLowerCase().trim() );
	};

	return (
		<p className="themer--search-component">
			<input
				type="text"
				onChange={ ( event ) => handleSearch( event ) }
				placeholder={ placeholder }
			/>
		</p>
	);
};

export default Search;
