<?php
/**
 * Plugin Name: Back To Topper
 * Plugin URI:  https://wordpress.org/plugins/back-to-topper/
 * Description: Easily add a "Back to Top" button to your WordPress site, enhancing user experience by allowing visitors to navigate quickly to the top of the page.
 * Version:     1.0.0
 * Author:      Techwave Solutions
 * Author URI:  https://techwavesolutions.net/
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: back-to-topper
 * Domain Path: /languages
 */

namespace TechwaveSolutions\BackToTopper;

use TechwaveSolutions\BackToTopper\Admin\BackToTopperAdmin;
use TechwaveSolutions\BackToTopper\Settings\Settings;
use TechwaveSolutions\BackToTopper\BackToTopButton\DisplayScrollToTopButton;
use TechwaveSolutions\BackToTopper\DynamicStyle\DynamicStyle;
use TechwaveSolutions\BackToTopper\EnqueueAssets\EnqueueAssets;

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


/**
 * Main class for the Back To Topper plugin.
 */
class BackToTopper {

    /**
     * Constructor to initialize plugin components.
     */
    public function __construct() {
        // Set up activation hook
        register_activation_hook( __FILE__, array( $this, 'activatePlugin' ) );
        
        // Initialize plugin components
        $this->initializeComponents();
    }

    /**
     * Initialize all plugin components.
     */
    private function initializeComponents() {
        new BackToTopperAdmin();
        new DisplayScrollToTopButton();
        new DynamicStyle();
        new EnqueueAssets();
    }

    /**
     * Plugin activation function.
     */
    public function activatePlugin() {
        // Set default settings on plugin activation
        $settingsInstance = new Settings();
        $settingsInstance->setDefaultSettings();
    }
}

// Initialize the plugin
new BackToTopper();

?>