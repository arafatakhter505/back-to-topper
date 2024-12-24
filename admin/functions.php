<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Enqueue admin scripts and styles.
 */
function twsbtt_enqueue_admin_scripts() {
    if ( isset( $_GET['page'] ) && $_GET['page'] === 'back-to-topper-customize-panel' ) {
        wp_enqueue_script( 'twsbtt-plugin-js', plugins_url( 'assets/js/admin-script.js', __FILE__ ), array( 'wp-element' ), '1.0', true );

        wp_localize_script( 'twsbtt-plugin-js', 'backToTopperSettings', array(
            'apiUrl'   => esc_url( rest_url( 'back-to-topper-plugin/v1/settings' ) ),
            'settings' => get_option( 'twsbtt_plugin_settings' ),
            'pages'    => get_pages(),
            'posts'    => get_posts(),
            'nonce'    => wp_create_nonce( 'wp_rest' ),
        ) );
    }
}
add_action( 'admin_enqueue_scripts', 'twsbtt_enqueue_admin_scripts' );

/**
 * Register admin menu.
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
