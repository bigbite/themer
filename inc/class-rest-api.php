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
		 * Rest_API constructor.
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
