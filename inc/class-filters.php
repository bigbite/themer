<?php

namespace Big_Bite\themer;

/**
 * Loader for handling assets.
 */
class Filters {
	/**
	 * Initialise the hooks and filters.
	 */
	public function __construct() {
      // add_filter( 'wp_theme_json_data_theme', 'filter_theme_json_theme' );
       add_action( 'init', [ $this, 'bigbite_register_settings' ] );
	}

    /**
	 * Get current theme.json
	 * 
	 */
	public function filter_theme_json_theme( $theme_json ){
        $new_data = array(
            'version'  => 2,
            'settings' => array(
                'color' => array(
                    'text'       => false,
                    'palette'    => array( /* New palette */
                        array(
                            'slug'  => 'foreground',
                            'color' => 'black',
                            'name'  => __( 'Foreground', 'theme-domain' ),
                        ),
                        array(
                            'slug'  => 'background',
                            'color' => 'white',
                            'name'  => __( 'Background', 'theme-domain' ),
                        ),
                    ),
                ),
            ),
        );

        var_dump('here', $theme_json->get_theme_data());
    
        return $theme_json->get_theme_data();
    }

    public function bigbite_register_settings() {

        register_setting(
            'theme_override_settings',
            'theme_override_settings_json',
            array(
                'type'         => 'string',
                'show_in_rest' => true,
                'default'      => '',
            )
        );
    }
    
    
}



