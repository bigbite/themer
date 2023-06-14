<?php

namespace Big_Bite\themer;

/**
 * Loader for handling assets.
 */
class AdminSetup {
	/**
	 * Initialise the hooks and filters.
	 */
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'create_admin_screen' ], 1 );
		add_action( 'admin_init', [ $this, 'create_theme_options' ] );
	}

	/**
	 * Enqueue any required assets for the block editor.
	 *
	 * @return void
	 */
	public function create_admin_screen() : void {
		add_options_page(
			__( 'Theme Settings' ),
			'Theme Customiser',
			'manage_options',
			'theme_settings',
			[ $this, 'theme_render_settings' ],
		);
	}

	public function create_theme_options() : void {	
		add_option( 'theme_override_settings', '' );

		register_setting(
			'theme_overrides',
			'theme_override_settings',
			array(
				'type'         => 'string',
				'show_in_rest' => true,
				'default' => '',
			)
		);
	}
	
	

    public function theme_render_settings() {
		?>
	<div id="themer-admin-screen" class="theme-settings-page-wrapper wrap"></div>
		<?php
	}
}
