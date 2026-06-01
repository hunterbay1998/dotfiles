-------------------------------
---- ENVIRONMENT VARIABLES ----
-------------------------------

-- See https://wiki.hypr.land/Configuring/Advanced-and-Cool/Environment-variables/

-- Environment Variables
env = {
    -- Cursor
    XCURSOR_SIZE = "24",
    HYPRCURSOR_SIZE = "24",

    -- Flatpak
    XDG_DATA_DIRS = "/home/bailey/.local/share/flatpak/exports/share:/var/lib/flatpak/exports/share:/usr/local/share:/usr/share",

    -- Input Method (IBus)
    GTK_IM_MODULE = "ibus",
    QT_IM_MODULE = "ibus",
    XMODIFIERS = "@im=ibus",

    -- Scaling
    GDK_SCALE = "2",

    -- PATH
    PATH = "$PATH:/home/bailey/.local/bin",

    -- AMD Graphics (Laptop)
    WLR_DRM_DEVICES = "/dev/dri/card1:/dev/dri/card0",
}
