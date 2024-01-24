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
			'/theme-style-variation-posts',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_all_theme_style_variation_posts' ),
				'permission_callback' => function () {
					return true;
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
	 * Returns all 'wp_global_styles' posts linked to the current theme.
	 *
	 * @return WP_REST_Response|WP_Error
	 */
	public function get_all_theme_style_variation_posts(): WP_REST_Response|WP_Error {
		$theme = get_stylesheet();
		$posts = get_posts(
			array(
				'post_type'   => 'wp_global_styles',
				'numberposts' => -1,
				'post_status' => array( 'publish', 'draft' ),
			)
		);

		$current_theme_posts = array_values(
			array_filter(
				$posts,
				function ( $post ) use ( $theme ) {
					$post_name = str_replace( 'wp-global-styles-', '', $post->post_name );
					return $post_name === $theme;
				}
			)
		);

		if ( empty( $current_theme_posts ) ) {
			return new WP_Error( 'no_theme_styles', __( 'Unable to locate existing styles for the theme', 'themer' ) );
		}

		return rest_ensure_response( $current_theme_posts );
	}
}
