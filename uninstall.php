<?php
/**
 * Uninstall plugin.
 *
 * Deletes the plugin settings and other data stored by the plugin.
 *
 * @package BackToTopper
 * @since   1.0.0
 */

// If uninstall not called from WordPress exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    die;
}

// Delete plugin all settings.
delete_option( 'twsbtt_plugin_settings' );
