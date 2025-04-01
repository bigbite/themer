/**
 * Save JSON blob to a file as a JSON file
 *
 * @param {string} filename filename
 * @param {Object} data     theme.json data
 */
export const saveJsonFile = async ( filename, data ) => {
	const blob = new Blob( [ data ], { type: 'application/json' } ); // eslint-disable-line no-undef -- Blob available in browser environment

	const handle = await window.showSaveFilePicker( {
		suggestedName: filename,
	} );
	const stream = await handle.createWritable();

	await stream.write( blob );
	await stream.close();
};

/**
 * Save JSON blob to a file as a PHP template or pattern depending on the type
 *
 * @param {Object} data block template
 */
export const savePhpFile = async ( data ) => {
	const name = data?.title?.raw || 'Untitled';
	const description = data?.description?.raw || '';
	const categories =
		data.wp_pattern_category.length > 0
			? data?._embedded[ 'wp:term' ][ 0 ]
					.map( ( category ) => category.name )
					.join( ', ' )
			: '';
	const slug = data?.slug || '';

	const phpContent = `<?php
/**
 * Template Name: ${ name }
 * Slug: ${ slug }
${ description && ` * Description: ${ description }` }
${ categories && ` * Categories: ${ categories }` }
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

/**
 * Save JSON blob to a file as a PHP template or pattern depending on the type
 *
 * @param {Object} data block template
 */
export const saveHtmlFile = async ( data ) => {
	const htmlContent = data.content.raw;

	const blob = new Blob( [ htmlContent ], {
		type: 'application/x-httpd-php',
	} );

	const handle = await window.showSaveFilePicker( {
		suggestedName: `${ data.slug }.html`,
		types: [
			{
				description: 'HTML Files',
				accept: {
					'application/x-httpd-html': [ '.html' ],
				},
			},
		],
	} );
	const stream = await handle.createWritable();

	await stream.write( blob );
	await stream.close();
};
