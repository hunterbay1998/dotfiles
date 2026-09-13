import QtQuick
import QtQuick.Controls
import Quickshell
import Quickshell.Wayland

PanelWindow {
    id: root

    // ── Theme knobs ──
    property color bgBase:      "#11121a"
    property color fgPrimary:   "#cdd6f4"
    property color fgSecondary: "#a6adc8"
    property color accent:      "#89b4fa"
    property string uiFont:     "Adwaita Sans"
    property string iconFont:   "JetBrainsMono Nerd Font"
    property int    rounding:   14

    property string terminal: "kitty"

    // ── Window ──
    visible: false
    color: "transparent"
    exclusionMode: ExclusionMode.Ignore
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "quickshell-launcher"
    WlrLayershell.keyboardFocus: visible ? WlrKeyboardFocus.Exclusive : WlrKeyboardFocus.None
    anchors { top: true; bottom: true; left: true; right: true }

    function show() {
        searchField.text = ""
        results.currentIndex = 0
        visible = true
        searchField.forceActiveFocus()
    }

    function hide() {
        visible = false
    }

    function toggle() {
        if (visible) hide(); else show()
    }

    function launch(entry) {
        if (!entry) return
        hide()
        if (entry.runInTerminal)
            Quickshell.execDetached([root.terminal, "-e"].concat(entry.command))
        else
            entry.execute()
    }

    // ── Filtering ──
    // Rank: exact prefix on name > word-start on name > substring on name >
    // substring on generic name / comment. Ties broken alphabetically.
    function score(entry, q) {
        const name = entry.name.toLowerCase()
        if (name === q) return 0
        if (name.startsWith(q)) return 1
        if (name.split(/[\s\-_]+/).some(w => w.startsWith(q))) return 2
        if (name.includes(q)) return 3
        if ((entry.genericName || "").toLowerCase().includes(q)) return 4
        if ((entry.comment || "").toLowerCase().includes(q)) return 5
        return -1
    }

    ScriptModel {
        id: appModel
        objectProp: "id"
        values: {
            const q = searchField.text.trim().toLowerCase()
            const apps = DesktopEntries.applications.values.filter(a => !a.noDisplay)

            if (q === "")
                return apps.sort((a, b) => a.name.localeCompare(b.name))

            return apps
                .map(a => ({ app: a, s: root.score(a, q) }))
                .filter(r => r.s >= 0)
                .sort((a, b) => a.s - b.s || a.app.name.localeCompare(b.app.name))
                .map(r => r.app)
        }
    }

    // ── Click-outside to dismiss ──
    MouseArea {
        anchors.fill: parent
        onClicked: root.hide()
    }

    // ── Card ──
    Rectangle {
        id: card
        anchors.centerIn: parent
        width: 560
        height: 480
        color: Qt.rgba(root.bgBase.r, root.bgBase.g, root.bgBase.b, 0.96)
        radius: root.rounding
        border.width: 1
        border.color: Qt.rgba(root.accent.r, root.accent.g, root.accent.b, 0.35)
        antialiasing: true

        // Swallow clicks so they don't reach the dismiss handler behind.
        MouseArea { anchors.fill: parent }

        // ── Search bar ──
        Rectangle {
            id: searchBar
            anchors { top: parent.top; left: parent.left; right: parent.right; margins: 14 }
            height: 44
            color: Qt.rgba(1, 1, 1, 0.07)
            radius: 10
            border.width: 1
            border.color: searchField.activeFocus
                ? Qt.rgba(root.accent.r, root.accent.g, root.accent.b, 0.65)
                : Qt.rgba(1, 1, 1, 0.12)
            Behavior on border.color { ColorAnimation { duration: 150 } }

            Text {
                id: searchIcon
                anchors { left: parent.left; leftMargin: 14; verticalCenter: parent.verticalCenter }
                text: ""
                font.family: root.iconFont
                font.pixelSize: 15
                color: Qt.rgba(root.fgSecondary.r, root.fgSecondary.g, root.fgSecondary.b, 0.55)
            }

            TextInput {
                id: searchField
                anchors {
                    left: searchIcon.right; leftMargin: 10
                    right: parent.right; rightMargin: 14
                    verticalCenter: parent.verticalCenter
                }
                font.family: root.uiFont
                font.pixelSize: 14
                color: root.fgPrimary
                selectionColor: Qt.rgba(root.accent.r, root.accent.g, root.accent.b, 0.45)
                selectedTextColor: root.fgPrimary
                clip: true

                onTextChanged: results.currentIndex = 0

                Text {
                    anchors.fill: parent
                    verticalAlignment: Text.AlignVCenter
                    text: "Search applications..."
                    font: searchField.font
                    color: Qt.rgba(root.fgSecondary.r, root.fgSecondary.g, root.fgSecondary.b, 0.45)
                    visible: !searchField.text
                }

                Keys.onEscapePressed: {
                    if (searchField.text !== "") searchField.text = ""
                    else root.hide()
                }
                Keys.onDownPressed: results.incrementCurrentIndex()
                Keys.onUpPressed: results.decrementCurrentIndex()
                Keys.onReturnPressed: root.launch(results.currentItem ? results.currentItem.entry : null)
                Keys.onEnterPressed: root.launch(results.currentItem ? results.currentItem.entry : null)
            }
        }

        // ── Results ──
        ListView {
            id: results
            anchors {
                top: searchBar.bottom; topMargin: 8
                left: parent.left; leftMargin: 8
                right: parent.right; rightMargin: 8
                bottom: parent.bottom; bottomMargin: 8
            }
            clip: true
            model: appModel
            spacing: 2
            currentIndex: 0
            highlightMoveDuration: 120
            // Keep the selected row on screen when arrowing past the edge.
            highlightRangeMode: ListView.ApplyRange
            preferredHighlightBegin: 60
            preferredHighlightEnd: height - 60

            ScrollBar.vertical: ScrollBar { policy: ScrollBar.AsNeeded }

            delegate: Rectangle {
                id: row
                required property var modelData
                required property int index
                readonly property alias entry: row.modelData

                width: results.width
                height: 52
                radius: 10
                color: results.currentIndex === index
                    ? Qt.rgba(root.accent.r, root.accent.g, root.accent.b, 0.18)
                    : rowArea.containsMouse
                        ? Qt.rgba(1, 1, 1, 0.06)
                        : "transparent"
                Behavior on color { ColorAnimation { duration: 120 } }

                Item {
                    id: iconHolder
                    width: 34; height: 34
                    anchors { left: parent.left; leftMargin: 12; verticalCenter: parent.verticalCenter }

                    Image {
                        id: appIcon
                        anchors.fill: parent
                        sourceSize: Qt.size(34, 34)
                        smooth: true
                        fillMode: Image.PreserveAspectFit
                        source: row.entry.icon ? Quickshell.iconPath(row.entry.icon, true) : ""
                        visible: status === Image.Ready
                    }
                    Text {
                        anchors.centerIn: parent
                        text: "󰓆"
                        font.family: root.iconFont
                        font.pixelSize: 21
                        color: Qt.rgba(root.fgPrimary.r, root.fgPrimary.g, root.fgPrimary.b, 0.5)
                        visible: !appIcon.visible
                    }
                }

                Column {
                    anchors {
                        left: iconHolder.right; leftMargin: 14
                        right: parent.right; rightMargin: 12
                        verticalCenter: parent.verticalCenter
                    }
                    spacing: 2

                    Text {
                        width: parent.width
                        text: row.entry.name
                        font.family: root.uiFont
                        font.pixelSize: 13
                        font.weight: Font.Medium
                        color: root.fgPrimary
                        elide: Text.ElideRight
                    }
                    Text {
                        width: parent.width
                        text: row.entry.comment || row.entry.genericName || ""
                        font.family: root.uiFont
                        font.pixelSize: 11
                        color: Qt.rgba(root.fgSecondary.r, root.fgSecondary.g, root.fgSecondary.b, 0.6)
                        visible: text !== "" && text !== row.entry.name
                        elide: Text.ElideRight
                    }
                }

                MouseArea {
                    id: rowArea
                    anchors.fill: parent
                    hoverEnabled: true
                    cursorShape: Qt.PointingHandCursor
                    onEntered: results.currentIndex = row.index
                    onClicked: root.launch(row.entry)
                }
            }

            Text {
                anchors.centerIn: parent
                visible: results.count === 0
                text: "No matches"
                font.family: root.uiFont
                font.pixelSize: 13
                color: Qt.rgba(root.fgSecondary.r, root.fgSecondary.g, root.fgSecondary.b, 0.5)
            }
        }
    }
}
