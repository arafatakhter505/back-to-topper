<?php

/**
 * Add dynamic styles to the page.
 */
function twsbtt_dynamic_style() {
    $options = get_option( 'twsbtt_plugin_settings' );
    $options = wp_parse_args( $options, array(
        'iconColor'        => '#ffffff',
        'hoverIconColor'   => '#ffffff',
        'bgColor'          => '#004CFF',
        'hoverBgColor'     => '#000000',
        'progressColor'   => '#454545',
        'left'             => null,
        'right'            => 20,
        'bottom'           => 20,
        'width'            => 50,
        'height'           => 50,
        'borderRadius'     => 15,
        'hoverBorderRadius'=> 5,
        'paddingTop'       => 10,
        'paddingBottom'    => 10,
        'paddingLeft'      => 10,
        'paddingRight'     => 10,
        'buttonOpacity'    => 100,
    ) );

    // Output the dynamic CSS for the button
    echo "<style>
        .twsbtt-scroll-to-top {
            background-color: {$options['bgColor']};
            font-size: 20px;
            border-radius: {$options['borderRadius']}px;
            padding-top: {$options['paddingTop']}px;
            padding-bottom: {$options['paddingBottom']}px;
            padding-left: {$options['paddingLeft']}px;
            padding-right: {$options['paddingRight']}px;
            opacity: {$options['buttonOpacity']}%;
        }
        .twsbtt-scroll-to-top svg {
            fill: {$options['iconColor']};
        }
        .twsbtt-scroll-to-top-progress:hover .twsbtt-scroll-to-top svg {
            fill: {$options['hoverIconColor']};
        }
        .twsbtt-scroll-to-top-progress {    
            left: {$options['left']}px;
            right: {$options['right']}px;
            bottom: {$options['bottom']}px;
            width: {$options['width']}px;
            height: {$options['height']}px;
            opacity: {$options['buttonOpacity']}%;
            border-radius: {$options['borderRadius']}px;
        }
        .twsbtt-scroll-to-top-progress:hover {
            border-radius: {$options['hoverBorderRadius']}px;
        }
        .twsbtt-scroll-to-top-progress:hover .twsbtt-scroll-to-top {
            background-color: {$options['hoverBgColor']};
            border-radius: {$options['hoverBorderRadius']}px;
        }
    </style>";
}
add_action( 'wp_head', 'twsbtt_dynamic_style' );

?>