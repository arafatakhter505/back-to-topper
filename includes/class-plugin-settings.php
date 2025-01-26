<?php

namespace TechwaveSolutions\BackToTopper\Settings;

/**
 * Class to handle plugin settings.
 */
class Settings {

    /**
     * Constructor to initialize hooks.
     */
    public function __construct() {
        // Hook for plugin activation
        add_action( 'plugin_activation_hook', [ $this, 'setDefaultSettings' ] );
    }

    /**
     * Set default settings on plugin activation.
     *
     * @return void
     */
    public function setDefaultSettings() {
        $default_settings = $this->getDefaultSettings();

        // Check if settings exist, otherwise set defaults
        if ( false === get_option( 'twsbtt_plugin_settings' ) ) {
            update_option( 'twsbtt_plugin_settings', $default_settings );
        }
    }

    /**
     * Returns the default plugin settings.
     *
     * @return array
     */
    private function getDefaultSettings() {
        return [
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
            'hoverIconColor'   => '#000000',
            'bgColor'          => '#000000',
            'hoverBgColor'     => '#ffffff',
            'progressColor'     => '#454545',
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
            'excludePosts'     => [],
        ];
    }
}

