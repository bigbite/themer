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
		add_action( 'rest_api_init', array( $this, 'init' ) );
	}

	/**
	 * Initialise the REST API
	 */
	public function init(): void {
		$controller = new WP_REST_Themer_Controller();
		$controller->register_routes();
	}
}
