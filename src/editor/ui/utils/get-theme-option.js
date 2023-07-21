/**
 * Returns the value of the specified selector from the base object
 *
 * @param {string} selector Property target selector
 * @param {object} base     Theme settings
 *
 * @returns {*} Value of selector
 */
const getThemeOption = ( selector, base ) => {
	const selectorArray = selector.split( '.' );
	return selectorArray.reduce( ( acc, curr ) => acc[ curr ], base );
};

export default getThemeOption;
