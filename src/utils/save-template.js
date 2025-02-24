/**
 * Save JSON blob to a file
 *
 * @param {Object} data block template
 */
const saveTemplate = async ( data ) => {
	// Create PHP template header
	const phpContent = `<?php
/**
 * Template Name: ${ data.title.raw }
 */

?>

${ data.content.raw }`;

	const blob = new Blob( [ phpContent ], {
		type: 'application/x-httpd-php',
	} );

	const handle = await window.showSaveFilePicker( {
		suggestedName: `${ data.slug }.php`,
		types: [
			{
				description: 'PHP Files',
				accept: {
					'application/x-httpd-php': [ '.php' ],
				},
			},
		],
	} );
	const stream = await handle.createWritable();

	await stream.write( blob );
	await stream.close();
};

export default saveTemplate;
