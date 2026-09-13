pragma Singleton

import Quickshell
import Quickshell.Io

Singleton {
    id: root

    // DesktopEntries has no usage-based ordering of its own, so we keep our
    // own launch counts and fold them into the ranking.
    FileView {
        id: file
        path: Quickshell.statePath("usage.json")
        watchChanges: true
        onFileChanged: reload()
        onAdapterUpdated: writeAdapter()
        printErrors: false

        JsonAdapter {
            id: adapter
            property var counts: ({})
        }
    }

    function count(key) {
        const c = adapter.counts;
        return (c && c[key]) || 0;
    }

    function record(key) {
        if (!key)
            return;
        // Reassign rather than mutate, or the adapter won't see the change.
        const next = Object.assign({}, adapter.counts);
        next[key] = (next[key] || 0) + 1;
        adapter.counts = next;
    }
}
