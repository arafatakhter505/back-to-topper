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

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Add admin menu page
function twsbtt_customize_panel() {
    add_menu_page(
        __( 'Back To Topper', 'back-to-topper' ),
        __( 'Back To Topper', 'back-to-topper' ),
        'manage_options',
        'back-to-topper-customize-panel',
        'twsbtt_admin_page',
        'dashicons-arrow-up-alt',
        5
    );
}

function twsbtt_admin_page() {
    echo "<div id='twsbtt-admin-root' class='wrap'></div>";
}

add_action( 'admin_menu', 'twsbtt_customize_panel' );

// Register REST API endpoint
function twsbtt_plugin_register_rest_route() {
    register_rest_route( 'back-to-topper-plugin/v1', '/settings', [
        'methods' => 'POST',
        'callback' => 'twsbtt_plugin_save_settings',
        'permission_callback' => function() {
            return current_user_can( 'manage_options' ); // Ensure the user has permission
        },
    ]);
}
add_action( 'rest_api_init', 'twsbtt_plugin_register_rest_route' );

// Callback function to save settings
function twsbtt_plugin_save_settings( $data ) {
    // Get the settings from the request
    $settings = $data->get_params();

    // Save settings to the WordPress options table
    update_option( 'twsbtt_plugin_settings', $settings );

    return new WP_REST_Response( 'Settings saved successfully.', 200 );
}

// Enqueue React App and pass data to it
function twsbtt_enqueue_script() {
    wp_enqueue_script('twsbtt-plugin-js', plugins_url('dist/main.js', __FILE__), array('wp-element'), '1.0', true);
    wp_enqueue_style('twsbtt-plugin-css', plugins_url('dist/styles.css', __FILE__));

    // Pass the REST API URL and nonce to React (or JavaScript)
    wp_localize_script('twsbtt-plugin-js', 'backToTopperSettings', array(
        'apiUrl' => esc_url(rest_url('back-to-topper-plugin/v1/settings')),
        'settings' => get_option('twsbtt_plugin_settings'),
        'nonce' => wp_create_nonce('wp_rest') // Add nonce for REST API authentication
    ));
}
add_action('admin_enqueue_scripts', 'twsbtt_enqueue_script');

// Enqueue scripts and styles
function twsbtt_enqueue_assets() {
    wp_enqueue_style('twsbtt-style', plugins_url('public/css/styles.css', __FILE__));
    wp_enqueue_script('twsbtt-script', plugins_url('public/js/script.js', __FILE__), [], null, true);

    wp_localize_script('twsbtt-script', 'backToTopperSettings', array(
        'apiUrl' => esc_url(rest_url('back-to-topper-plugin/v1/settings')),
        'settings' => get_option('twsbtt_plugin_settings'),
        'nonce' => wp_create_nonce('wp_rest') // Add nonce for REST API authentication
    ));
}
add_action('wp_enqueue_scripts', 'twsbtt_enqueue_assets');

// Display the "Scroll to Top" button
function twsbtt_display_scroll_to_top_button() {
    $options = get_option("twsbtt_plugin_settings");
    $icon = isset($options['icon']) ? $options['icon'] : "/public/svg/arrow-2.svg";
    
    if (empty($svg_file_path)) {
        $svg_file_path = plugin_dir_url(__FILE__) . $icon;
    }

    // Read the contents of the SVG file
    $svg_content = file_get_contents($svg_file_path);

    // Ensure the SVG content is valid and sanitize it for safe output
    if ($svg_content !== false) {
        // Output the button with the SVG icon (directly injected inline)
        echo '<button id="twsbttScrollToTopBtn" class="twsbtt-scroll-to-top">' . $svg_content . '</button>';
    }
}
add_action('wp_footer', 'twsbtt_display_scroll_to_top_button');

// Add dynamic styles in the head
function twsbtt_dynamic_style() {
    $options = get_option("twsbtt_plugin_settings");
    $iconColor = isset($options['iconColor']) ? $options['iconColor'] : "#ffffff";
    $hoverIconColor = isset($options['hoverIconColor']) ? $options['hoverIconColor'] : "#000000";
    $bgColor = isset($options['bgColor']) ? $options['bgColor'] : "#000000";
    $hoverBgColor = isset($options['hoverBgColor']) ? $options['hoverBgColor'] : "#00a96e";
    $left = isset($options['left']) ? $options['left'] : null;
    $right = isset($options['right']) ? $options['right'] : "20";
    $bottom = isset($options['bottom']) ? $options['bottom'] : "20";
    $width = isset($options['width']) ? $options['width'] : "50";
    $height = isset($options['height']) ? $options['height'] : "50";
    $borderRadius = isset($options['borderRadius']) ? $options['borderRadius'] : "15";
    $hoverBorderRadius = isset($options['hoverBorderRadius']) ? $options['hoverBorderRadius'] : "5";
    $paddingTop = isset($options['paddingTop']) ? $options['paddingTop'] : "10";
    $paddingBottom = isset($options['paddingBottom']) ? $options['paddingBottom'] : "10";
    $paddingLeft = isset($options['paddingLeft']) ? $options['paddingLeft'] : "10";
    $paddingRight = isset($options['paddingRight']) ? $options['paddingRight'] : "10";

    echo "<style>
        .twsbtt-scroll-to-top {
            background-color: {$bgColor};
            font-size: 20px;
            left: {$left}px;
            right: {$right}px;
            bottom: {$bottom}px;
            width: {$width}px;
            height: {$height}px;
            border-radius: {$borderRadius}px;
            padding-top: {$paddingTop}px;
            padding-bottom: {$paddingBottom}px;
            padding-left: {$paddingLeft}px;
            padding-right: {$paddingRight}px;
        }
        .twsbtt-scroll-to-top:hover {
            background-color: {$hoverBgColor};
            border-radius: {$hoverBorderRadius}px;
        }
        .twsbtt-scroll-to-top svg {
            fill: {$iconColor};
        }
        .twsbtt-scroll-to-top:hover svg {
            fill: {$hoverIconColor};
        }
    </style>";
    
}
add_action('wp_head', 'twsbtt_dynamic_style');

?>