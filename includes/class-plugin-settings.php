<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Handle plugin settings.
 */
class TW_Scroll_To_Top_Settings {

    public static function set_default_settings() {
        $default_settings = array(
            'enabled'          => true,
            'autoHide'         => true,
            'hideSmallDevice'  => true,
            'scrollDuration'   => 500,
            'scrollOffset'     => 200,
            'width'            => 50,
            'height'           => 50,
            'borderRadius'     => 15,
            'hoverBorderRadius'=> 5,
            'iconColor'        => '#ffffff',
            'hoverIconColor'   => '#ffffff',
            'bgColor'          => '#004CFF',
            'hoverBgColor'     => '#000000',
            'left'             => '',
            'right'            => 20,
            'bottom'           => 20,
            'icon'             => '/assets/images/arrow-15.svg',
            'paddingTop'       => 10,
            'paddingBottom'    => 10,
            'paddingLeft'      => 10,
            'paddingRight'     => 10,
            'buttonOpacity'    => 100,
            'excludePages'     => [],
            'excludePosts'     => []
        );

        if ( get_option( 'twsbtt_plugin_settings' ) === false ) {
            update_option( 'twsbtt_plugin_settings', $default_settings );
        }
    }

    public static function save_settings( $data ) {
        $settings = $data->get_params();
        update_option( 'twsbtt_plugin_settings', $settings );
        return new WP_REST_Response( 'Settings saved successfully.', 200 );
    }
}
