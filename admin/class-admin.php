<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register the REST API endpoint to save settings.
 */
function twsbtt_plugin_register_rest_route() {
    register_rest_route( 'back-to-topper-plugin/v1', '/settings', [
        'methods'             => 'POST',
        'callback'            => [ 'TW_Scroll_To_Top_Settings', 'save_settings' ],
        'permission_callback' => 'twsbtt_plugin_permission_callback',
    ] );
}
add_action( 'rest_api_init', 'twsbtt_plugin_register_rest_route' );

/**
 * Permission callback for REST API route.
 */
function twsbtt_plugin_permission_callback() {
    return current_user_can( 'manage_options' );
}
