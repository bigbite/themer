<?php
/**
 * Custom REST routes.
 *
 * @package themer
 */

namespace Big_Bite\Themer;

/**
 * Custom REST routes.
 */
class REST_API {
	/**
	 * REST_API constructor.
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		add_action( 'rest_api_init', array( $this, 'register_fields' ) );
	}

	/**
	 * Register the custom REST API routes.
	 */
	public function register_routes(): void {
		$controller = new WP_REST_Themer_Controller();
		$controller->register_routes();
	}

	/**
	 * Register custom fields for the REST API.
	 */
	public function register_fields(): void {
		$template_types = array( 'wp_template_part', 'wp_template' );

		foreach ( $template_types as $template_type ) {
			register_rest_field(
				$template_type,
				'themer_has_changes',
				array(
					'get_callback' => function ( $data ) {
						$template_files = _get_block_templates_files( $data['type'] );

						$template_file = current(
							array_filter(
								$template_files,
								function ( $template_file ) use ( $data ) {
										return $template_file['slug'] === $data['slug'];
								}
							)
						);

						if ( empty( $template_file ) ) {
							return array();
						}

						$saved_date = $data['modified'] ? strtotime( get_gmt_from_date( $data['modified'] ) ) : 0;
						$modified   = filemtime( $template_file['path'] );

						return $saved_date > $modified;
					},
					'schema'       => array(
						'type'        => 'boolean',
						'description' => 'Whether the template part matches the file content',
					),
				)
			);
		}
	}
}
