pragma Singleton

import QtQuick
import Quickshell

Singleton {
    // Values mirror noctalia's Tokyo Night Storm output, taken from the
    // generated gtk/niri templates so the launcher matches the rest of the
    // desktop. Regenerate these if the noctalia theme changes.
    readonly property color bg:        "#1a1b26"  // window_bg_color
    readonly property color surface:   "#24283b"  // card/popover/sidebar_bg_color
    readonly property color fg:        "#c0caf5"  // window_fg_color
    readonly property color fgDim:     "#9aa5ce"
    readonly property color fgMuted:   "#565f89"
    readonly property color accent:    "#7aa2f7"  // accent_color
    readonly property color accentFg:  "#16161e"  // accent_fg_color
    readonly property color error:     "#f7768e"  // error_color
    readonly property color success:   "#bb9af7"

    readonly property string uiFont:   "Adwaita Sans"
    readonly property string iconFont: "JetBrainsMono Nerd Font"

    readonly property int rounding: 14
    readonly property int radiusSm: 10

    function alpha(c, a) {
        return Qt.rgba(c.r, c.g, c.b, a);
    }
}
