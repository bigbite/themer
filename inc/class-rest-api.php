<?php
/**
 * Custom REST routes.
 *
 * @package themer
 */

namespace Big_Bite\themer;

use WP_Error;
use WP_Theme_JSON;
use WP_REST_Request;
use WP_REST_Response;
use WP_Theme_JSON_Resolver;

/**
 * Custom REST routes.
 */
class Rest_API {
	/**
	 * Initialise hooks and filters
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register routes
	 */
	public function register_routes() {
		register_rest_route(
			'themer/v1',
			'/styles',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'get_styles' ),
				'permission_callback' => function () {
					return true;
				},
			)
		);

		register_rest_route(
			'themer/v1',
			'/export',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_theme_json' ),
				'permission_callback' => fn() => is_user_logged_in() && current_user_can( 'edit_theme_options' ),
			)
		);

		register_rest_route(
			'themer/v1',
			'/theme-json-loaded',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'can_load_theme_json' ),
				'permission_callback' => function () {
					return true;
				},
			)
		);

		register_rest_route(
			'themer/v1',
			'/style-variations',
			array(
				'methods'             => 'GET,POST',
				'callback'            => array( $this, 'handle_theme_style_variations' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_theme_options' );
				},
			)
		);
	}

	/**
	 * Get custom CSS rules by merging styles from request with existing theme.json data
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_REST_Response|WP_Error theme.json generated stylesheet response data or WP_Error on failure.
	 */
	public function get_styles( WP_REST_Request $request ) {
		$existing_theme_json = WP_Theme_JSON_Resolver::get_merged_data();

		if ( ! $existing_theme_json instanceof WP_Theme_JSON ) {
			return new WP_Error( 'no_theme_json', __( 'Unable to locate existing theme.json data', 'themer' ) );
		}

		$custom_styles          = $request->get_json_params();
		$custom_theme_json_data = array_merge( $existing_theme_json->get_raw_data(), $custom_styles );
		$custom_theme_json      = new WP_Theme_JSON( $custom_theme_json_data );

		return rest_ensure_response( $custom_theme_json->get_stylesheet() );
	}

	/**
	 * Check if a valid theme json file is loaded.
	 *
	 * @return \WP_REST_Response|true returns an object for the error or true if valid.
	 */
	public function can_load_theme_json() {
		$theme_json_path = get_stylesheet_directory() . '/theme.json';
		$response        = true;

		if ( ! is_readable( $theme_json_path ) ) {
			$message  = sprintf( 'cannot read the file "theme.json" from %s', $theme_json_path );
			$response = array(
				'error_type' => 'error',
				'message'    => $message,
			);
			return rest_ensure_response( $response );
		}

		$value = wp_json_file_decode( $theme_json_path );
		if ( null === $value ) {
			$message  = 'the theme.json file contains invalid json.';
			$response = array(
				'error_type' => 'error',
				'message'    => $message,
			);
			return rest_ensure_response( $response );
		}

		return rest_ensure_response( $response );
	}

	/**
	 * Returns an updated theme.json with merged and flattened layers
	 *
	 * @return WP_REST_Response|WP_Error
	 */
	public function get_theme_json(): WP_REST_Response|WP_Error {
		$all_theme_json_layers = WP_Theme_JSON_Resolver::get_merged_data();

		if ( ! $all_theme_json_layers instanceof WP_Theme_JSON ) {
			return new WP_Error( 'no_theme_json', __( 'Unable to locate existing theme.json data', 'themer' ) );
		}

		$theme_json_raw_data  = new WP_Theme_JSON( $all_theme_json_layers->get_raw_data() );
		$theme_json_flattened = $theme_json_raw_data->get_data();

		return rest_ensure_response( $theme_json_flattened );
	}

	/**
	 * GET request returns all of the `wp_global_styles` posts for the current theme.
	 * POST request publishes the post with the supplied ID and sets all other posts to draft.
	 *
	 * @param WP_REST_Request $request - The request object.
	 * @return WP_REST_Response|WP_Error
	 */
	public function handle_theme_style_variations( $request ): WP_REST_Response|WP_Error {
		$method = $request->get_method();
		$theme  = get_stylesheet();
		$posts  = get_posts(
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
				'tax_query'              => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query -- This could be a slow query, but it's necessary.
					array(
						'taxonomy' => 'wp_theme',
						'field'    => 'name',
						'terms'    => $theme,
					),
				),
			)
		);

		if ( empty( $posts ) ) {
			return new WP_Error( 'no_theme_styles', __( 'Unable to locate existing styles for the theme', 'themer' ) );
		}

		if ( 'GET' === $method ) {
			return rest_ensure_response( $posts );
		}

		if ( 'POST' === $method ) {
			$json_body        = $request->get_json_params();
			$global_styles_id = $json_body['globalStylesId'];
			$post_ids         = array_column( $posts, 'ID' );
			if ( ! $global_styles_id || ! in_array( $global_styles_id, $post_ids, true ) ) {
				return new WP_Error( 'invalid_global_styles_id', __( 'Invalid global styles ID', 'themer' ) );
			}

			foreach ( $posts as $post ) {
				$post_status = 'draft';
				if ( $post->ID === $global_styles_id ) {
					$post_status = 'publish';
				}
				wp_update_post(
					array(
						'ID'          => $post->ID,
						'post_status' => $post_status,
					)
				);
			}

			return rest_ensure_response( new WP_REST_Response( array( 'message' => __( 'Active theme style variation updated.', 'themer' ) ), 200 ) );
		}

		return rest_ensure_response( new WP_REST_Response( array( 'error' => __( 'Unsupported request method.', 'themer' ) ), 405 ) );
	}
}
