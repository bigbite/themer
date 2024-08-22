<?php
/**
 * Used for utility functions.
 *
 * @package themer
 */

namespace Big_Bite\themer;

/**
 * Retrieves all of the `wp_global_styles` posts linked to the active theme.
 *
 * @return Array<WP_Post>
 */
function get_theme_style_variation_posts() {
	$stylesheet = get_stylesheet();
	return get_posts(
		array(
			'post_type'              => 'wp_global_styles',
			'post_status'            => array( 'publish', 'draft' ),
			'orderby'                => 'date',
			'order'                  => 'desc',
			'numberposts'            => -1,
			'ignore_sticky_posts'    => true,
			'no_found_rows'          => true,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query -- This could be a slow query, but it's necessary.
			'tax_query'              => array(
				array(
					'taxonomy' => 'wp_theme',
					'field'    => 'name',
					'terms'    => $stylesheet,
				),
			),
		)
	);
}
