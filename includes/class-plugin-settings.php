<?php

/**
 * Class to handle plugin settings.
 */
class TWSBTT_Settings {

    /**
     * Constructor to initialize hooks.
     */
    public function __construct() {
        // Hook for plugin activation
        add_action( 'plugin_activation_hook', [ $this, 'set_default_settings' ] );

        // Hook to register REST API route
        add_action( 'rest_api_init', [ $this, 'register_rest_route' ] );
    }

    /**
     * Set default settings on plugin activation.
     *
     * @return void
     */
    public function set_default_settings() {
        $default_settings = $this->get_default_settings();

        // Check if settings exist, otherwise set defaults
        if ( false === get_option( 'twsbtt_plugin_settings' ) ) {
            update_option( 'twsbtt_plugin_settings', $default_settings );
        }
    }

    /**
     * Returns the default plugin settings.
     *
     * @return array
     */
    private function get_default_settings() {
        return [
            'enabled'          => true,
            'autoHide'         => true,
            'hideSmallDevice'  => true,
            'scrollDuration'   => 500,
            'scrollOffset'     => 200,
            'width'            => 50,
            'height'           => 50,
            'borderRadius'     => 15,
            'hoverBorderRadius'=> 5,
            'iconColor'        => '#ffffff',
            'hoverIconColor'   => '#ffffff',
            'bgColor'          => '#004CFF',
            'hoverBgColor'     => '#000000',
            'left'             => '',
            'right'            => 20,
            'bottom'           => 20,
            'icon'             => '/assets/images/arrow-15.svg',
            'paddingTop'       => 10,
            'paddingBottom'    => 10,
            'paddingLeft'      => 10,
            'paddingRight'     => 10,
            'buttonOpacity'    => 100,
            'excludePages'     => [],
            'excludePosts'     => [],
        ];
    }

    /**
     * Register the REST API endpoint for saving plugin settings.
     */
    public function register_rest_route() {
        register_rest_route( 'back-to-topper-plugin/v1', '/settings', [
            'methods'             => 'POST',
            'callback'            => [ $this, 'save_settings' ],
            'permission_callback' => [ $this, 'permission_callback' ],
        ] );
    }

    /**
     * Save settings via the REST API.
     *
     * @param WP_REST_Request $data The request data.
     * @return WP_REST_Response
     */
    public function save_settings( $data ) {
        $settings = $data->get_params();
    
        // Validate and sanitize each setting
        $sanitized_settings = [
            'enabled'          => filter_var( $settings['enabled'], FILTER_VALIDATE_BOOLEAN ),
            'autoHide'         => filter_var( $settings['autoHide'], FILTER_VALIDATE_BOOLEAN ),
            'hideSmallDevice'  => filter_var( $settings['hideSmallDevice'], FILTER_VALIDATE_BOOLEAN ),
            'scrollDuration'   => absint( $settings['scrollDuration'] ),
            'scrollOffset'     => absint( $settings['scrollOffset'] ),
            'width'            => absint( $settings['width'] ),
            'height'           => absint( $settings['height'] ),
            'borderRadius'     => absint( $settings['borderRadius'] ),
            'hoverBorderRadius'=> absint( $settings['hoverBorderRadius'] ),
            'iconColor'        => sanitize_hex_color( $settings['iconColor'] ),
            'hoverIconColor'   => sanitize_hex_color( $settings['hoverIconColor'] ),
            'bgColor'          => sanitize_hex_color( $settings['bgColor'] ),
            'hoverBgColor'     => sanitize_hex_color( $settings['hoverBgColor'] ),
            'left'             => sanitize_text_field( $settings['left'] ),
            'right'            => absint( $settings['right'] ),
            'bottom'           => absint( $settings['bottom'] ),
            'icon'             => esc_url_raw( $settings['icon'] ),
            'paddingTop'       => absint( $settings['paddingTop'] ),
            'paddingBottom'    => absint( $settings['paddingBottom'] ),
            'paddingLeft'      => absint( $settings['paddingLeft'] ),
            'paddingRight'     => absint( $settings['paddingRight'] ),
            'buttonOpacity'    => absint( $settings['buttonOpacity'] ),
            'excludePages'     => array_map( 'absint', (array) $settings['excludePages'] ), // Ensure it's an array of integers
            'excludePosts'     => array_map( 'absint', (array) $settings['excludePosts'] ), // Ensure it's an array of integers
        ];
    
        // Optional: Validate that all required settings are present
        $required_settings = [ 'enabled', 'scrollDuration', 'scrollOffset', 'width', 'height' ];
        foreach ( $required_settings as $setting ) {
            if ( ! isset( $sanitized_settings[ $setting ] ) ) {
                return new \WP_REST_Response( 'Missing required settings.', 400 );
            }
        }
    
        // Optional: Validate values are within reasonable ranges
        if ( $sanitized_settings['width'] < 10 || $sanitized_settings['width'] > 200 ) {
            return new \WP_REST_Response( 'Width must be between 10 and 200.', 400 );
        }
    
        // Save sanitized settings
        update_option( 'twsbtt_plugin_settings', $sanitized_settings );
    
        return new \WP_REST_Response( 'Settings saved successfully.', 200 );
    }
    

    /**
     * Permission callback for REST API route.
     *
     * @return bool
     */
    public function permission_callback() {
        // Check if the current user has the required capabilities
        return current_user_can( 'manage_options' );
    }
}

