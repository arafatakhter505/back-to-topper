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
require_once plugin_dir_path( __FILE__ ) . 'admin/functions.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/class-plugin-settings.php';
include_once plugin_dir_path( __FILE__ ) . 'includes/enqueue-assets.php';
include_once plugin_dir_path( __FILE__ ) . 'includes/dynamic-style.php';
include_once plugin_dir_path( __FILE__ ) . 'includes/display-scroll-to-top-button.php';

// Register activation hook and instantiate the class
register_activation_hook( __FILE__, 'activate_back_to_topper_plugin' );

/**
 * Function to activate the plugin and set default settings.
 */
function activate_back_to_topper_plugin() {
    // Instantiate the settings class to run the default settings setup
    $settings_instance = new TWSBTT_Settings();
    $settings_instance->set_default_settings();
}

?>
