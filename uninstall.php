<?php
// Exit if accessed directly.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}

// Remove options on uninstall.
delete_option( 'twsbtt_plugin_settings' );
