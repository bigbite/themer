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
       add_filter( 'wp_theme_json_data_theme', [$this, 'filter_theme_json_theme' ] );
       add_action( 'init', [ $this, 'bigbite_register_settings' ] );
	}

    /**
	 * Get current theme.json
	 * 
	 */
	public function filter_theme_json_theme( $theme_json ){
        $theme_override = get_option('theme_override_settings', '');
        $theme_string = json_decode($theme_override, true);

        $new_data = array();

        

        if ($theme_string) {
            $new_data = array(
                'version'  => 2,
                'settings' => $theme_string['settings']
            );
        }

        return $theme_json->update_with($new_data);

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



