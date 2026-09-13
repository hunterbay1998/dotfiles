import QtQuick
import QtQuick.Controls
import Quickshell
import Quickshell.Wayland
import Quickshell.Widgets

PanelWindow {
    id: root

    property string terminal: "kitty"

    // "" is the start menu; anything else is a tree we've drilled into.
    property string mode: ""
    readonly property string query: search.text.trim().toLowerCase()

    visible: false
    color: "transparent"
    exclusionMode: ExclusionMode.Ignore
    aboveWindows: true
    focusable: visible
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "quickshell-launcher"
    anchors { top: true; bottom: true; left: true; right: true }

    function show() {
        mode = "";
        search.text = "";
        list.currentIndex = 0;
        visible = true;
        search.forceActiveFocus();
    }

    function hide() {
        visible = false;
    }

    function toggle() {
        if (visible)
            hide();
        else
            show();
    }

    function enter(tree) {
        mode = tree;
        search.text = "";
        list.currentIndex = 0;
    }

    // Escape and backspace both unwind one level at a time: clear the query,
    // then leave the tree, then close.
    function back() {
        if (search.text !== "")
            search.text = "";
        else if (mode !== "")
            enter("");
        else
            hide();
    }

    // ── Entry sources ───────────────────────────────────────────────
    // Everything is normalised to the same shape so one delegate and one
    // ranking pass can handle apps, links and categories alike.
    function categoryEntries() {
        return [
            {
                key: "cat:apps",
                kind: "category",
                name: "Applications",
                desc: DesktopEntries.applications.values.length + " installed",
                glyph: "",
                icon: "",
                payload: "apps"
            },
            {
                key: "cat:weblinks",
                kind: "category",
                name: "Web Links",
                desc: WebLinks.links.length + " bookmarked",
                glyph: "",
                icon: "",
                payload: "weblinks"
            }
        ];
    }

    function appEntries() {
        // Already excludes NoDisplay/Hidden entries.
        return DesktopEntries.applications.values.map(a => ({
            key: "app:" + a.id,
            kind: "app",
            name: a.name,
            desc: a.comment || a.genericName || "",
            extra: (a.keywords || []).join(" "),
            glyph: "󰀻",
            icon: a.icon ? Quickshell.iconPath(a.icon, true) : "",
            payload: a
        }));
    }

    function weblinkEntries() {
        return (WebLinks.links || []).map(l => ({
            key: "web:" + l.url,
            kind: "weblink",
            name: l.name,
            desc: l.url,
            extra: l.tags || "",
            glyph: l.glyph || "",
            icon: "",
            payload: l
        }));
    }

    // Lower is better; -1 means no match at all.
    function score(e, q) {
        const name = e.name.toLowerCase();
        if (name === q) return 0;
        if (name.startsWith(q)) return 1;
        if (name.split(/[\s\-_]+/).some(w => w.startsWith(q))) return 2;
        if (name.includes(q)) return 3;
        if ((e.desc || "").toLowerCase().includes(q)) return 4;
        if ((e.extra || "").toLowerCase().includes(q)) return 5;
        return -1;
    }

    function rank(pool, q) {
        return pool
            .map(e => ({ e: e, s: root.score(e, q) }))
            .filter(r => r.s >= 0)
            .sort((a, b) =>
                a.s - b.s
                || Usage.count(b.e.key) - Usage.count(a.e.key)
                || a.e.name.localeCompare(b.e.name))
            .map(r => r.e);
    }

    function byUsage(pool) {
        return pool.sort((a, b) =>
            Usage.count(b.key) - Usage.count(a.key)
            || a.name.localeCompare(b.name));
    }

    function buildEntries() {
        const q = root.query;

        if (mode === "")
            // Typing at the start menu searches every tree at once.
            return q === ""
                ? categoryEntries()
                : rank(appEntries().concat(weblinkEntries()), q).concat(searchRow(q));

        const pool = mode === "apps" ? appEntries() : weblinkEntries();
        const listed = q === "" ? byUsage(pool) : rank(pool, q);
        return mode === "weblinks" ? listed.concat(searchRow(q)) : listed;
    }

    function searchRow(q) {
        if (q === "")
            return [];
        return [{
            key: "search:web",
            kind: "websearch",
            name: "Search the web for “" + search.text.trim() + "”",
            desc: "DuckDuckGo",
            extra: "",
            glyph: "",
            icon: "",
            payload: search.text.trim()
        }];
    }

    function activate(e) {
        if (!e)
            return;

        if (e.kind === "category") {
            enter(e.payload);
            return;
        }

        hide();
        Usage.record(e.key);

        if (e.kind === "app") {
            const a = e.payload;
            if (a.runInTerminal) {
                // execute() ignores runInTerminal, so wrap it ourselves.
                Quickshell.execDetached({
                    command: [root.terminal].concat(a.command),
                    workingDirectory: a.workingDirectory
                });
            } else {
                a.execute();
            }
        } else if (e.kind === "weblink") {
            WebLinks.open(e.payload.url);
        } else if (e.kind === "websearch") {
            WebLinks.search(e.payload);
        }
    }

    ScriptModel {
        id: entryModel
        objectProp: "key"
        values: root.buildEntries()
    }

    // Click anywhere outside the card to dismiss.
    MouseArea {
        anchors.fill: parent
        onClicked: root.hide()
    }

    Rectangle {
        id: card
        anchors.centerIn: parent
        width: 620
        height: 520
        color: Theme.alpha(Theme.bg, 0.97)
        radius: Theme.rounding
        border.width: 1
        border.color: Theme.alpha(Theme.accent, 0.35)
        antialiasing: true

        // Swallow clicks so they don't reach the dismiss handler behind.
        MouseArea { anchors.fill: parent }

        // ── Search bar ──────────────────────────────────────────────
        Rectangle {
            id: searchBar
            anchors { top: parent.top; left: parent.left; right: parent.right; margins: 14 }
            height: 46
            color: Theme.alpha(Theme.surface, 0.9)
            radius: Theme.radiusSm
            border.width: 1
            border.color: search.activeFocus
                ? Theme.alpha(Theme.accent, 0.65)
                : Theme.alpha(Theme.fgMuted, 0.4)
            Behavior on border.color { ColorAnimation { duration: 150 } }

            Text {
                id: searchIcon
                anchors { left: parent.left; leftMargin: 14; verticalCenter: parent.verticalCenter }
                text: root.mode === "" ? "" : ""
                font.family: Theme.iconFont
                font.pixelSize: 15
                color: Theme.accent
            }

            // Breadcrumb chip showing which tree we're inside.
            Rectangle {
                id: crumb
                visible: root.mode !== ""
                anchors { left: searchIcon.right; leftMargin: 10; verticalCenter: parent.verticalCenter }
                width: crumbText.implicitWidth + 18
                height: 24
                radius: 6
                color: Theme.alpha(Theme.accent, 0.2)

                Text {
                    id: crumbText
                    anchors.centerIn: parent
                    text: root.mode === "apps" ? "Applications" : "Web Links"
                    font.family: Theme.uiFont
                    font.pixelSize: 11
                    font.weight: Font.Medium
                    color: Theme.accent
                }
            }

            TextInput {
                id: search
                anchors {
                    left: crumb.visible ? crumb.right : searchIcon.right
                    leftMargin: 10
                    right: parent.right
                    rightMargin: 14
                    verticalCenter: parent.verticalCenter
                }
                font.family: Theme.uiFont
                font.pixelSize: 14
                color: Theme.fg
                selectionColor: Theme.alpha(Theme.accent, 0.45)
                selectedTextColor: Theme.fg
                clip: true

                onTextChanged: list.currentIndex = 0

                Text {
                    anchors.fill: parent
                    verticalAlignment: Text.AlignVCenter
                    visible: !search.text
                    text: root.mode === "apps" ? "Search applications..."
                        : root.mode === "weblinks" ? "Search links, or the web..."
                        : "Search, or pick a category..."
                    font: search.font
                    color: Theme.fgMuted
                }

                Keys.onEscapePressed: root.back()
                Keys.onDownPressed: list.incrementCurrentIndex()
                Keys.onUpPressed: list.decrementCurrentIndex()
                Keys.onRightPressed: event => {
                    // Right only navigates when it can't be a cursor move.
                    const e = list.currentItem ? list.currentItem.entry : null;
                    if (search.text === "" && e && e.kind === "category")
                        root.activate(e);
                    else
                        event.accepted = false;
                }
                Keys.onReturnPressed: root.activate(list.currentItem ? list.currentItem.entry : null)
                Keys.onEnterPressed: root.activate(list.currentItem ? list.currentItem.entry : null)
                Keys.onPressed: event => {
                    if (event.key === Qt.Key_Backspace && search.text === "" && root.mode !== "") {
                        root.enter("");
                        event.accepted = true;
                    }
                }
            }
        }

        // ── Results ─────────────────────────────────────────────────
        ListView {
            id: list
            anchors {
                top: searchBar.bottom; topMargin: 6
                left: parent.left; leftMargin: 8
                right: parent.right; rightMargin: 8
                bottom: parent.bottom; bottomMargin: 8
            }
            clip: true
            model: entryModel
            spacing: 2
            currentIndex: 0
            highlightMoveDuration: 120
            // Keep the selection on screen when arrowing past the edge.
            highlightRangeMode: ListView.ApplyRange
            preferredHighlightBegin: 60
            preferredHighlightEnd: height - 60

            ScrollBar.vertical: ScrollBar { policy: ScrollBar.AsNeeded }

            delegate: Rectangle {
                id: row

                required property var modelData
                required property int index
                readonly property alias entry: row.modelData

                width: list.width
                height: 54
                radius: Theme.radiusSm
                color: list.currentIndex === index
                    ? Theme.alpha(Theme.accent, 0.18)
                    : hover.containsMouse
                        ? Theme.alpha(Theme.fg, 0.06)
                        : "transparent"
                Behavior on color { ColorAnimation { duration: 120 } }

                Item {
                    id: iconHolder
                    width: 34
                    height: 34
                    anchors { left: parent.left; leftMargin: 12; verticalCenter: parent.verticalCenter }

                    IconImage {
                        id: appIcon
                        anchors.fill: parent
                        asynchronous: true
                        source: row.entry.icon || ""
                        visible: row.entry.icon !== "" && status === Image.Ready
                    }

                    Text {
                        anchors.centerIn: parent
                        visible: !appIcon.visible
                        text: row.entry.glyph
                        font.family: Theme.iconFont
                        font.pixelSize: 20
                        color: row.entry.kind === "category" ? Theme.accent : Theme.alpha(Theme.fg, 0.55)
                    }
                }

                Column {
                    anchors {
                        left: iconHolder.right; leftMargin: 14
                        right: chevron.left; rightMargin: 10
                        verticalCenter: parent.verticalCenter
                    }
                    spacing: 2

                    Text {
                        width: parent.width
                        text: row.entry.name
                        font.family: Theme.uiFont
                        font.pixelSize: 13
                        font.weight: Font.Medium
                        color: Theme.fg
                        elide: Text.ElideRight
                    }

                    Text {
                        width: parent.width
                        visible: text !== "" && text !== row.entry.name
                        text: row.entry.desc
                        font.family: Theme.uiFont
                        font.pixelSize: 11
                        color: Theme.fgDim
                        elide: Text.ElideRight
                    }
                }

                // Categories get an affordance; cross-tree hits get a tag so
                // you can tell an app from a link when searching from the root.
                Text {
                    id: chevron
                    anchors { right: parent.right; rightMargin: 14; verticalCenter: parent.verticalCenter }
                    text: row.entry.kind === "category" ? ""
                        : (root.mode === "" && row.entry.kind === "weblink") ? "link"
                        : ""
                    font.family: row.entry.kind === "category" ? Theme.iconFont : Theme.uiFont
                    font.pixelSize: row.entry.kind === "category" ? 14 : 10
                    color: Theme.fgMuted
                }

                MouseArea {
                    id: hover
                    anchors.fill: parent
                    hoverEnabled: true
                    cursorShape: Qt.PointingHandCursor
                    onEntered: list.currentIndex = row.index
                    onClicked: root.activate(row.entry)
                }
            }

            Text {
                anchors.centerIn: parent
                visible: list.count === 0
                text: "No matches"
                font.family: Theme.uiFont
                font.pixelSize: 13
                color: Theme.fgMuted
            }
        }
    }
}
