<?php
/**
 * Custom REST routes.
 *
 * @package themer
 */

namespace Big_Bite\themer;

use WP_REST_Controller;

/**
 * Custom REST routes.
 */
class Rest_API extends WP_REST_Controller {
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
	}

	/**
	 * Returns the theme.json generated stylesheet
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return String theme.json generated stylesheet response data or WP_Error on failure.
	 */
	public function get_styles( $request ) {
		return rest_ensure_response( wp_get_global_stylesheet() );
	}

	/**
	 * Returns all theme.json data merged Core > Theme > User
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return Mixed theme.json data or WP_Error on failure.
	 */
	public function get_theme_json( $request ) {
		return rest_ensure_response( wp_get_global_settings() );
	}
}
