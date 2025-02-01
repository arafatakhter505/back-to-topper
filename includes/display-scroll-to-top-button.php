<?php

namespace TechwaveSolutions\BackToTopper\BackToTopButton;

/**
 * Class DisplayScrollToTopButton
 */
class DisplayScrollToTopButton {

    /**
     * DisplayScrollToTopButton constructor.
     */
    public function __construct() {
        add_action( 'wp_footer', [ $this, 'displayScrollToTopButton' ] );
    }

    /**
     * Display the "Scroll to Top" button.
     */
    public function displayScrollToTopButton() {
        $options          = get_option( 'twsbtt_plugin_settings' );
        $icon             = $options['icon'] ?? '/assets/images/arrow-15.svg';
        $svg_file_path    = plugin_dir_url( dirname( __FILE__ ) ) . $icon;
        $svg_content      = @file_get_contents( $svg_file_path );

        // Display the button with SVG icon
        if ( $svg_content !== false ) {
            echo '<div id="twsbttScrollToTopBtnProgress" class="twsbtt-scroll-to-top-progress"><button id="twsbttScrollToTopBtn" class="twsbtt-scroll-to-top">' . $svg_content . '</button></div>';
        }
    }
}

?>