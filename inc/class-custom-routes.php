<?php

namespace Big_Bite\themer;

/**
 * Loader for handling assets.
 */
class RestRoutes {
	/**
	 * Initialise the hooks and filters.
	 */
	public function __construct() {
        add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	/**
	 * Enqueue any required assets for the block editor.
	 *
	 * @return void
	 */
	public function register_routes() : void {
		register_rest_route( 'themer/v1', '/current-theme', [
			'methods'             => 'GET',
			'callback'            => [ $this, 'get_current_theme' ],
			'permission_callback' => function () {
				return true;
			},
		] );

		register_rest_route( 'themer/v1', '/set', [
			'methods'             => 'POST',
			'callback'            => [ $this, 'set_theme_settings' ],
			'permission_callback' => function () {
				return true;
			},
		] );
	}

    /**
	 * set settings in theme.json
	 * 
	 */
	public function set_theme_settings($req) {
		$theme = $req->get_body();
       // 	var_dump('global settings',  json_decode($theme) );
		var_dump( json_decode($theme)->settings );

		//return $req;
	}

    /**
	 * Get current theme.json
	 * 
	 */
	public function get_current_theme() {
		// theme.json
        $global_settings = wp_get_global_settings( $path = array() , $block_name = array() ,$context = array('origin' => 'theme') );
        $global_styles = wp_get_global_styles( $path = array() , $block_name = array() ,$context = array('origin' => 'theme') );

		$theme['styles'] = $global_styles;
        $theme['settings'] = $global_settings;

		//overrides created in the themer plugin
		$theme_override = get_option('theme_override_settings', '');
        $theme_string = json_decode($theme_override);
		$override_settings = $theme_string->settings;
        $override_styles = $theme_string->styles;

		//var_dump('global settings', $global_settings);
		//var_dump('override settings', $override_settings);

		if ($override_settings) {
			//var_dump('override');
			$theme['settings'] = $override_settings;
		}


        // $theme['styles'] = $global_styles;
        // $theme['settings'] = $global_settings;

       // var_dump('global styles', $global_styles);
		return $theme;
	}
}
