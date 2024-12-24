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

// Include necessary files.
require_once plugin_dir_path( __FILE__ ) . 'includes/class-plugin-settings.php';
require_once plugin_dir_path( __FILE__ ) . 'admin/functions.php';
require_once plugin_dir_path( __FILE__ ) . 'admin/class-admin.php';


// Enqueue frontend assets.
function twsbtt_enqueue_assets() {
    wp_enqueue_style( 'twsbtt-style', plugins_url( 'assets/css/styles.css', __FILE__ ) );
    wp_enqueue_script( 'twsbtt-script', plugins_url( 'assets/js/script.js', __FILE__ ), array(), null, true );

    $activeId = is_page() || is_single() ? get_queried_object_id() : '';

    wp_localize_script( 'twsbtt-script', 'backToTopperSettings', array(
        'apiUrl'   => esc_url( rest_url( 'back-to-topper-plugin/v1/settings' ) ),
        'settings' => get_option( 'twsbtt_plugin_settings' ),
        'activeId' => $activeId,
        'nonce'    => wp_create_nonce( 'wp_rest' ),
    ) );
}
add_action( 'wp_enqueue_scripts', 'twsbtt_enqueue_assets' );

// Display "Scroll to Top" button.
function twsbtt_display_scroll_to_top_button() {
    $options = get_option( 'twsbtt_plugin_settings' );
    $icon = isset( $options['icon'] ) ? $options['icon'] : '/assets/images/arrow-15.svg';

    $svg_file_path = plugin_dir_url( __FILE__ ) . $icon;
    $svg_content = file_get_contents( $svg_file_path );

    if ( false !== $svg_content ) {
        echo '<button id="twsbttScrollToTopBtn" class="twsbtt-scroll-to-top">' . $svg_content . '</button>';
    }
}
add_action( 'wp_footer', 'twsbtt_display_scroll_to_top_button' );

// Add dynamic styles.
function twsbtt_dynamic_style() {
    $options = get_option( 'twsbtt_plugin_settings' );
    $options = wp_parse_args( $options, array(
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
        'buttonOpacity'    => 100
    ) );

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
            opacity: {$options['buttonOpacity']}%;
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

?>