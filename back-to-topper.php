<?php
/**
 * Plugin Name: Back To Topper
 * Plugin URI:  https://wordpress.org/plugins/search/back-to-topper/
 * Description: Easily add a "Back to Top" button to your WordPress site, enhancing user experience by allowing visitors to navigate quickly to the top of the page.
 * Version:     1.0.0
 * Author:      Techwave Solutions
 * Author URI:  https://techwavesolutions.net/
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: back-to-topper
 * Domain Path: /languages
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Set default settings upon plugin activation.
 */
function twsbtt_set_default_settings() {
    // Default settings array
    $default_settings = array(
        'enabled'          => true,
        'autoHide'         => true,
        'hideSmallDevice'  => true,
        'scrollDuration'   => 500,
        'calculation'      => true,
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
        'icon'             => '/public/svg/arrow-15.svg',
        'paddingTop'       => 10,
        'paddingBottom'    => 10,
        'paddingLeft'      => 10,
        'paddingRight'     => 10,
    );

    // Check if settings already exist, if not, set default settings
    if ( get_option( 'twsbtt_plugin_settings' ) === false ) {
        update_option( 'twsbtt_plugin_settings', $default_settings );
    }
}
register_activation_hook( __FILE__, 'twsbtt_set_default_settings' );

/**
 * Handle plugin uninstallation and update options accordingly.
 */
function twsbtt_on_plugin_uninstall() {
    // Optionally, you can reset settings to default or remove the option entirely
    delete_option( 'twsbtt_plugin_settings' );  // Remove the plugin settings option when uninstalled.
}
register_uninstall_hook( __FILE__, 'twsbtt_on_plugin_uninstall' );

/**
 * Register the admin menu for the plugin settings page.
 */
function twsbtt_customize_panel() {
    $icon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMTU1LjEzOSAxNTUuMTM5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNTUuMTM5IDE1NS4xMzk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMTE0LjU4OCw0NS40MmgyOC4xN0w5Ny4zMzgsMGwtNDUuNDIsNDUuNDJoMjguNTE2Qzc2LjQsOTguOTM3LDQ4LjUyOSwxNDIuMTczLDEyLjM4MSwxNTIuNjg2DQoJCQljNS41MTMsMS42MDUsMTEuMjI0LDIuNDUyLDE3LjA3MSwyLjQ1MkM3My42MDEsMTU1LjEzOSwxMDkuOTQsMTA3LjExMSwxMTQuNTg4LDQ1LjQyeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K';

    add_menu_page(
        __( 'Back To Topper', 'back-to-topper' ),
        __( 'Back To Topper', 'back-to-topper' ),
        'manage_options',
        'back-to-topper-customize-panel',
        'twsbtt_admin_page',
        $icon,
        5
    );
}
add_action( 'admin_menu', 'twsbtt_customize_panel' );

/**
 * Display the admin page content.
 */
function twsbtt_admin_page() {
    echo "<div id='twsbtt-admin-root' class='wrap'></div>";
}

/**
 * Register REST API endpoint to save settings.
 */
function twsbtt_plugin_register_rest_route() {
    register_rest_route( 'back-to-topper-plugin/v1', '/settings', [
        'methods'             => 'POST',
        'callback'            => 'twsbtt_plugin_save_settings',
        'permission_callback' => 'twsbtt_plugin_permission_callback',
    ]);
}
add_action( 'rest_api_init', 'twsbtt_plugin_register_rest_route' );

/**
 * Permission callback for REST API route.
 *
 * @return bool
 */
function twsbtt_plugin_permission_callback() {
    return current_user_can( 'manage_options' ); // Ensure the user has permission.
}

/**
 * Save settings via the REST API.
 *
 * @param WP_REST_Request $data The request data.
 * @return WP_REST_Response
 */
function twsbtt_plugin_save_settings( $data ) {
    $settings = $data->get_params();
    update_option( 'twsbtt_plugin_settings', $settings );

    return new WP_REST_Response( 'Settings saved successfully.', 200 );
}

/**
 * Enqueue plugin scripts and styles for the admin page.
 */
function twsbtt_enqueue_script() {
    if ( is_admin() && isset($_GET['page']) && $_GET['page'] === 'back-to-topper-customize-panel') {
        wp_enqueue_script( 'twsbtt-plugin-js', plugins_url( 'dist/main.js', __FILE__ ), array( 'wp-element' ), '1.0', true );
        wp_enqueue_style( 'twsbtt-plugin-css', plugins_url( 'dist/styles.css', __FILE__ ) );
    }
    

    wp_localize_script( 'twsbtt-plugin-js', 'backToTopperSettings', array(
        'apiUrl'   => esc_url( rest_url( 'back-to-topper-plugin/v1/settings' ) ),
        'settings' => get_option( 'twsbtt_plugin_settings' ),
        'nonce'    => wp_create_nonce( 'wp_rest' ),
    ) );
}
add_action( 'admin_enqueue_scripts', 'twsbtt_enqueue_script' );

/**
 * Enqueue plugin frontend scripts and styles.
 */
function twsbtt_enqueue_assets() {
    wp_enqueue_style( 'twsbtt-style', plugins_url( 'public/css/styles.css', __FILE__ ) );
    wp_enqueue_script( 'twsbtt-script', plugins_url( 'public/js/script.js', __FILE__ ), array(), null, true );

    wp_localize_script( 'twsbtt-script', 'backToTopperSettings', array(
        'apiUrl'   => esc_url( rest_url( 'back-to-topper-plugin/v1/settings' ) ),
        'settings' => get_option( 'twsbtt_plugin_settings' ),
        'nonce'    => wp_create_nonce( 'wp_rest' ),
    ) );
}
add_action( 'wp_enqueue_scripts', 'twsbtt_enqueue_assets' );

/**
 * Display the "Scroll to Top" button in the footer.
 */
function twsbtt_display_scroll_to_top_button() {
    $options = get_option( 'twsbtt_plugin_settings' );
    $icon = isset( $options['icon'] ) ? $options['icon'] : '/public/svg/arrow-15.svg';

    $svg_file_path = plugin_dir_url( __FILE__ ) . $icon;
    $svg_content = file_get_contents( $svg_file_path );

    // Ensure the SVG content is valid and sanitize it for safe output.
    if ( false !== $svg_content ) {
        echo '<button id="twsbttScrollToTopBtn" class="twsbtt-scroll-to-top">' . $svg_content . '</button>';
    }
}
add_action( 'wp_footer', 'twsbtt_display_scroll_to_top_button' );

/**
 * Add dynamic styles to the head section of the page.
 */
function twsbtt_dynamic_style() {
    $options = get_option( 'twsbtt_plugin_settings' );

    $default_options = array(
        'iconColor'        => '#ffffff',
        'hoverIconColor'   => '#ffffff',
        'bgColor'          => '#004CFF',
        'hoverBgColor'     => '#000000',
        'left'             => null,
        'right'            => 20,
        'bottom'           => 20,
        'width'            => 50,
        'height'           => 50,
        'borderRadius'     => 15,
        'hoverBorderRadius'=> 5,
        'paddingTop'       => 10,
        'paddingBottom'    => 10,
        'paddingLeft'      => 10,
        'paddingRight'     => 10,
    );

    $options = wp_parse_args( $options, $default_options );

    echo "<style>
        .twsbtt-scroll-to-top {
            background-color: {$options['bgColor']};
            font-size: 20px;
            left: {$options['left']}px;
            right: {$options['right']}px;
            bottom: {$options['bottom']}px;
            width: {$options['width']}px;
            height: {$options['height']}px;
            border-radius: {$options['borderRadius']}px;
            padding-top: {$options['paddingTop']}px;
            padding-bottom: {$options['paddingBottom']}px;
            padding-left: {$options['paddingLeft']}px;
            padding-right: {$options['paddingRight']}px;
        }
        .twsbtt-scroll-to-top:hover {
            background-color: {$options['hoverBgColor']};
            border-radius: {$options['hoverBorderRadius']}px;
        }
        .twsbtt-scroll-to-top svg {
            fill: {$options['iconColor']};
        }
        .twsbtt-scroll-to-top:hover svg {
            fill: {$options['hoverIconColor']};
        }
    </style>";
}
add_action( 'wp_head', 'twsbtt_dynamic_style' );
