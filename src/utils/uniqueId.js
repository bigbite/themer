/**
 * Returns a randomly generated id of numbers and letters.
 * 
 * @param {string} length the length of the id to generated.
 * @returns {string} the generated id.
 */
const uniqueId = (length = 8) => {
	return Math.random().toString(36).substring(2, 2 + length);
};

export default uniqueId;
