<?php
/**
 * Custom REST routes.
 *
 * @package themer
 */

namespace Big_Bite\themer;

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
	}

	/**
	 * Get custom CSS rules by merging styles from request with existing theme.json data
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return \WP_REST_Response|\WP_Error theme.json generated stylesheet response data or WP_Error on failure.
	 */
	public function get_styles( \WP_REST_Request $request ) {
		$existing_theme_json = \WP_Theme_JSON_Resolver::get_merged_data();

		if ( ! $existing_theme_json instanceof \WP_Theme_JSON ) {
			return new \WP_Error( 'no_theme_json', __( 'Unable to locate existing theme.json data', 'themer' ) );
		}

		$custom_styles          = $request->get_json_params();
		$custom_theme_json_data = array_merge( $existing_theme_json->get_raw_data(), $custom_styles );
		$custom_theme_json      = new \WP_Theme_JSON( $custom_theme_json_data );

		return rest_ensure_response( $custom_theme_json->get_stylesheet() );
	}

}
