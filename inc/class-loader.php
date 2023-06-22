<?php

namespace Big_Bite\themer;

/**
 * Loader for handling assets.
 */
class Loader
{
    const SCRIPT_NAME = 'themer-script';
    const STYLE_NAME  = 'themer-style';

    /**
     * Initialise the hooks and filters.
     */
    public function __construct() {
        add_action('admin_enqueue_scripts', [ $this, 'enqueue_themer_assets' ], 1);
    }

    /**
     * Enqueue any required assets for the themer plugin.
     *
     * @return void
     */
    public function enqueue_themer_assets() : void {
        $plugin_name = basename(THEMER_DIR);

        wp_enqueue_style('wp-components'); 

        wp_enqueue_script(
            self::SCRIPT_NAME,
            plugins_url($plugin_name . '/build/index.js', $plugin_name),
            [ 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-plugins', 'wp-edit-post', 'wp-api' ],
            (string) filemtime(THEMER_DIR . '/build/index.js'),
            false
        );

        wp_enqueue_style(
            self::STYLE_NAME,
            plugins_url($plugin_name . '/build/index.css', $plugin_name),
            [],
            (string) filemtime(THEMER_DIR . '/build/index.css')
        );
    }
}






