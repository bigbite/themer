/**
 * Save JSON blob to a file
 *
 * @param {Object} data block template
 */
const saveHelper = async ( data ) => {
	// Create PHP template header
	let phpContent = '';
	if ( 'wp_block' === data.type ) {
		const name = data?.title?.raw || 'Untitled';
		const description = data?.description?.raw || '';
		const categories =
			data.wp_pattern_category.length > 0
				? data?._embedded[ 'wp:term' ][ 0 ]
						.map( ( category ) => category.name )
						.join( ', ' )
				: '';
		const slug = data?.slug || '';

		const patternContent = `<?php
/**
 * Template Name: ${ name }
 * Slug: ${ slug }
${ description && ` * Description: ${ description }` }
${ categories && ` * Categories: ${ categories }` }
 */
?>

${ data.content.raw }`;
		phpContent = patternContent;
	} else {
		const templateContent = `<?php
/**
 * Template Name: ${ data.title.raw }
 */

?>

${ data.content.raw }`;
		phpContent = templateContent;
	}

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

export default saveHelper;
