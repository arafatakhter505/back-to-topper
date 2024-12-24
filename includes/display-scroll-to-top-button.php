<?php

/**
 * Display the "Scroll to Top" button.
 */
function twsbtt_display_scroll_to_top_button() {
    $options = get_option( 'twsbtt_plugin_settings' );
    $icon = isset( $options['icon'] ) ? $options['icon'] : '/assets/images/arrow-15.svg';

    // Get the SVG content from the file
    $svg_file_path = plugin_dir_url( dirname( __FILE__ ) ) . $icon;
    $svg_content = file_get_contents( $svg_file_path );

    // Display the button with SVG icon
    if ( false !== $svg_content ) {
        echo '<button id="twsbttScrollToTopBtn" class="twsbtt-scroll-to-top">' . $svg_content . '</button>';
    }
}
add_action( 'wp_footer', 'twsbtt_display_scroll_to_top_button' );

?>
