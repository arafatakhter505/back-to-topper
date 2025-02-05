<?php

namespace TechwaveSolutions\BackToTopper\Admin;

class BackToTopperAdmin {
    /**
     * Initialize hooks and actions for the admin functionality.
     */
    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'registerRestRoute' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueueAdminScripts' ] );
        add_action( 'admin_menu', [ $this, 'customizePanel' ] );
        add_filter( 'admin_body_class', [ $this, 'adminBodyClass' ] );
    }

    /**
     * Adds a custom class to the admin body for styling when on the back to top customize page.
     *
     * @param string $classes The existing classes on the admin body element.
     * @return string The modified classes.
     */
    public function adminBodyClass( $classes ) {
        if ( isset( $_GET['page'] ) && $_GET['page'] === 'back-to-topper-customize-panel' ) {
            $classes .= ' back-to-topper-customize-panel-page';
        }

        return $classes;
    }

    /**
     * Register the REST route for saving settings.
     */
    public function registerRestRoute() {
        register_rest_route(
            'back-to-topper-plugin/v1',
            '/settings',
            [
                'methods'             => 'POST',
                'callback'            => [ $this, 'saveSettings' ],
                'permission_callback' => [ $this, 'permissionCallBack' ],
            ]
        );
    }

    /**
     * Save plugin settings via REST API.
     *
     * @param WP_REST_Request $data
     * @return WP_REST_Response
     */
    public function saveSettings( $data ) {
        $settings = $data->get_params();

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
            'progressColor'     => sanitize_hex_color( $settings['progressColor'] ),
            'left'             => is_numeric($settings['left']) ? absint($settings['left']) : '',
            'right'            => is_numeric($settings['right']) ? absint($settings['right']) : '',
            'bottom'           => absint( $settings['bottom'] ),
            'icon'             => esc_url_raw( $settings['icon'] ),
            'paddingTop'       => absint( $settings['paddingTop'] ),
            'paddingBottom'    => absint( $settings['paddingBottom'] ),
            'paddingLeft'      => absint( $settings['paddingLeft'] ),
            'paddingRight'     => absint( $settings['paddingRight'] ),
            'buttonOpacity' => isset($settings['buttonOpacity']) ? absint($settings['buttonOpacity']) : 100,
            'excludePages'     => array_map(function($page) {
                return [
                    'value' => isset($page['value']) ? absint($page['value']) : 0, 
                    'label' => isset($page['label']) ? sanitize_text_field($page['label']) : ''
                ];
            }, (array) $settings['excludePages']),
            'excludePosts'     => array_map(function($post) {
                return [
                    'value' => isset($post['value']) ? absint($post['value']) : 0, 
                    'label' => isset($post['label']) ? sanitize_text_field($post['label']) : ''
                ];
            }, (array) $settings['excludePosts']),
        ];

        // Validate that all required settings are present
        $required_settings = [ 'enabled', 'scrollDuration', 'scrollOffset', 'width', 'height' ];
        foreach ( $required_settings as $setting ) {
            if ( ! isset( $sanitized_settings[ $setting ] ) ) {
                return new \WP_REST_Response( 'Missing required settings.', 400 );
            }
        }

        // Validate values are within reasonable ranges
        if ( $sanitized_settings['width'] < 10 || $sanitized_settings['width'] > 200 ) {
            return new WP_REST_Response( 'Width must be between 10 and 200.', 400 );
        }

        // Save sanitized settings
        update_option( 'twsbtt_plugin_settings', $sanitized_settings );

        return new \WP_REST_Response( 'Settings saved successfully.', 200 );
    }

    /**
     * Permission callback for REST route.
     *
     * @return bool
     */
    public function permissionCallBack() {
        return current_user_can( 'manage_options' );
    }

    /**
     * Enqueue admin scripts and localize data.
     */
    public function enqueueAdminScripts() {
        if ( isset( $_GET['page'] ) && $_GET['page'] === 'back-to-topper-customize-panel' ) {
            wp_enqueue_style( 'twsbtt-plugin-css', plugins_url( 'assets/css/admin-style.css', __FILE__ ), array(), '1.0' );
            wp_enqueue_style( 'twsbtt-plugin-panel-css', plugins_url( 'assets/js/admin-style.css', __FILE__ ), array(), '1.0' );
            wp_enqueue_script( 'twsbtt-plugin-js', plugins_url( 'assets/js/admin-script.js', __FILE__ ), array( 'wp-element' ), '1.0', true );

            wp_localize_script( 'twsbtt-plugin-js', 'backToTopperSettings', array(
                'apiUrl'   => esc_url( rest_url( 'back-to-topper-plugin/v1/settings' ) ),
                'settings' => get_option( 'twsbtt_plugin_settings' ),
                'pages'    => get_pages(),
                'posts'    => get_posts(),
                'nonce'    => wp_create_nonce( 'wp_rest' ),
            ) );
        }
    }

    /**
     * Add the plugin's customize panel to the admin menu.
     */
    public function customizePanel() {
        $icon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMTU1LjEzOSAxNTUuMTM5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNTUuMTM5IDE1NS4xMzk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMTE0LjU4OCw0NS40MmgyOC4xN0w5Ny4zMzgsMGwtNDUuNDIsNDUuNDJoMjguNTE2Qzc2LjQsOTguOTM3LDQ4LjUyOSwxNDIuMTczLDEyLjM4MSwxNTIuNjg2DQoJCQljNS41MTMsMS42MDUsMTEuMjI0LDIuNDUyLDE3LjA3MSwyLjQ1MkM3My42MDEsMTU1LjEzOSwxMDkuOTQsMTA3LjExMSwxMTQuNTg4LDQ1LjQyeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K';
    
        add_menu_page(
            esc_html__( 'Back To Topper', 'back-to-topper' ),
            esc_html__( 'Back To Topper', 'back-to-topper' ),
            'manage_options',
            'back-to-topper-customize-panel',
            [$this, 'adminPage'],
            $icon,
            5
        );
    }

     /**
     * Render the admin page content.
     */
    public function adminPage() {
        echo '<div id="twsbtt-admin-root" class="wrap"></div>';
    }
}

?>