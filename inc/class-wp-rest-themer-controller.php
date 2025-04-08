<?php

declare( strict_types = 1 );

namespace Big_Bite\themer;

use WP_Error;
use WP_REST_Controller;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;
use WP_Theme_JSON;
use WP_Theme_JSON_Resolver;

/**
 * Register REST API endpoints for Themer.
 */
class WP_REST_Themer_Controller extends WP_REST_Controller {

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->namespace = 'themer/v1';
	}

	/**
	 * Register Routes
	 *
	 * @return void
	 */
	public function register_routes(): void {

		register_rest_route(
			$this->namespace,
			'/styles',
			array(
				'methods'             => WP_REST_Server::EDITABLE,
				'callback'            => array( $this, 'get_styles' ),
				'permission_callback' => array( $this, 'themer_permission_check' ),
			)
		);

		register_rest_route(
			$this->namespace,
			'/export',
			array(
				'args'                => array(
					'include' => array(
						'description' => __( 'Array of theme.json data types to be merged', 'mediapress' ),
						'type'        => 'array',
						'items'       => array(
							'type' => 'string',
							'enum' => array( 'core', 'block', 'theme', 'user' ),
						),
					),
				),
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_theme_json' ),
				'permission_callback' => array( $this, 'themer_permission_check' ),
			)
		);

		register_rest_route(
			$this->namespace,
			'/theme-json-loaded',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'can_load_theme_json' ),
				'permission_callback' => array( $this, 'themer_permission_check' ),
			)
		);
	}

	/**
	 * Get custom CSS rules by merging styles from request with existing theme.json data
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return \WP_REST_Response|\WP_Error theme.json generated stylesheet response data or WP_Error on failure.
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
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response|\WP_Error The theme.json data or an error if it cannot be located.
	 */
	public function get_theme_json( $request ): WP_REST_Response|WP_Error {
		$include            = $request->get_param( 'include' );
		$include_core_data  = in_array( 'core', $include, true );
		$include_block_data = in_array( 'block', $include, true );

		$include_theme_data = in_array( 'theme', $include, true );

		$include_user_data = in_array( 'user', $include, true );

		$theme_json = new WP_Theme_JSON();

		if ( $include_core_data ) {
			$theme_json->merge( WP_Theme_JSON_Resolver::get_core_data() );
		}

		if ( $include_block_data ) {
			$theme_json->merge( WP_Theme_JSON_Resolver::get_block_data() );
		}

		if ( $include_theme_data ) {
			$theme_json->merge( WP_Theme_JSON_Resolver::get_theme_data() );
		}

		if ( $include_user_data ) {
			$theme_json->merge( WP_Theme_JSON_Resolver::get_user_data() );
		}

		if ( ! $theme_json instanceof WP_Theme_JSON ) {
			return new WP_Error( 'no_theme_json', __( 'Unable to locate existing theme.json data', 'themer' ) );
		}

		return rest_ensure_response( $theme_json->get_data() );
	}

	/**
	 * Sets a new 'active' style variation by ensuring it is the only one linked to the current theme that is published.
	 *
	 * @param int $global_styles_id - The ID of the style variation to be published.
	 * @return \WP_REST_Response|\WP_Error
	 */
	private function set_new_active_style_variation( int $global_styles_id ): WP_REST_Response|WP_Error {
		$posts = get_theme_style_variation_posts();

		// Sets the currently selected style variation to draft and publishes the newly selected one.
		foreach ( $posts as $post ) {
			if ( 'publish' !== $post->post_status && $post->ID !== $global_styles_id ) {
				continue;
			}

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

	/**
	 * GET request returns all of the `wp_global_styles` posts for the current theme.
	 * POST request publishes the post with the supplied ID and sets all other posts to draft.
	 *
	 * @param \WP_REST_Request $request - The request object.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function handle_theme_style_variations( $request ): WP_REST_Response|WP_Error {
		$method = $request->get_method();

		if ( 'GET' === $method ) {
			return $this->get_theme_style_variations();
		}

		if ( 'POST' === $method ) {
			$json_body        = $request->get_json_params();
			$global_styles_id = $json_body['globalStylesId'];
			return $this->set_new_active_style_variation( $global_styles_id );
		}

		return rest_ensure_response( new WP_REST_Response( array( 'error' => __( 'Unsupported request method.', 'themer' ) ), 405 ) );
	}

	/**
	 * Permission check
	 *
	 * @param \WP_REST_Request $request Current request.
	 *
	 * @return bool
	 */
	public function themer_permission_check( WP_REST_Request $request ): bool {
		return current_user_can( 'edit_theme_options' );
	}
}
