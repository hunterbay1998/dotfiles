pragma Singleton

import Quickshell
import Quickshell.Io

Singleton {
    id: root

    // Entries are plain JS objects so the launcher can treat them the same way
    // it treats desktop entries. Edit weblinks.json and the list reloads live.
    readonly property var links: adapter.links

    FileView {
        path: Qt.resolvedUrl("./weblinks.json")
        watchChanges: true
        onFileChanged: reload()

        JsonAdapter {
            id: adapter
            property var links: []
        }
    }

    function open(url) {
        Quickshell.execDetached(["xdg-open", url]);
    }

    function search(query) {
        Quickshell.execDetached([
            "xdg-open",
            "https://duckduckgo.com/?q=" + encodeURIComponent(query)
        ]);
    }
}
