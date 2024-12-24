<?php

/**
 * Enqueue frontend assets.
 */
function twsbtt_enqueue_assets() {
    // Enqueue stylesheet
    wp_enqueue_style( 'twsbtt-style', plugins_url( 'assets/css/styles.css', dirname( __FILE__ ) ) );

    // Enqueue script file
    wp_enqueue_script( 'twsbtt-script', plugins_url( 'assets/js/script.js', dirname( __FILE__ ) ), array(), null, true );

    // Get the active page/post ID
    $activeId = is_page() || is_single() ? get_queried_object_id() : '';

    // Localize the script with settings and API URL
    wp_localize_script( 'twsbtt-script', 'backToTopperSettings', array(
        'apiUrl'   => esc_url( rest_url( 'back-to-topper-plugin/v1/settings' ) ),
        'settings' => get_option( 'twsbtt_plugin_settings' ),
        'activeId' => $activeId,
        'nonce'    => wp_create_nonce( 'wp_rest' ),
    ) );
}
add_action( 'wp_enqueue_scripts', 'twsbtt_enqueue_assets' );

?>
