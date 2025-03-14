/**
 * Save JSON blob to a file
 *
 * @param {string} filename filename
 * @param {Object} data     theme.json data
 */
const saveFile = async ( filename, data ) => {
	const blob = new Blob( [ data ], { type: 'application/json' } ); // eslint-disable-line no-undef -- Blob available in browser environment

	const handle = await window.showSaveFilePicker( {
		suggestedName: filename,
	} );
	const stream = await handle.createWritable();

	await stream.write( blob );
	await stream.close();
};

export default saveFile;
