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
				'permission_callback' => function() {
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
	 * Returns an updated theme.json with merged and flattened layers
	 *
	 * @return WP_REST_Response|WP_Error
	 */
	public function get_theme_json(): WP_REST_Response | WP_Error {
		$all_theme_json_layers = WP_Theme_JSON_Resolver::get_merged_data();

		if ( ! $all_theme_json_layers instanceof WP_Theme_JSON ) {
			return new WP_Error( 'no_theme_json', __( 'Unable to locate existing theme.json data', 'themer' ) );
		}

		$theme_json_raw_data  = new WP_Theme_JSON( $all_theme_json_layers->get_raw_data() );
		$theme_json_flattened = $theme_json_raw_data->get_data();

		return rest_ensure_response( $theme_json_flattened );
	}
}
