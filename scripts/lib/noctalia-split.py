#!/usr/bin/env python3
"""Split a flat noctalia config export into the numbered files we keep in git.

Usage: noctalia-split.py <merged.toml> <output-dir>

Noctalia merges every *.toml in the config dir alphabetically, so the numeric
prefixes are purely for reading order -- the sections are disjoint either way.
Any top-level section this map has never heard of (a new noctalia release, say)
lands in 90-misc.toml with a warning rather than aborting the sync.
"""

import collections
import os
import re
import sys

GROUPS = [
    ("10-bar.toml",      ["bar"]),
    ("20-shell.toml",    ["shell"]),
    ("30-panels.toml",   ["control_center", "dock", "desktop_widgets",
                          "lockscreen_widgets"]),
    ("40-services.toml", ["calendar", "idle", "location", "nightlight",
                          "notification", "osd"]),
    ("50-theme.toml",    ["theme", "wallpaper"]),
    ("60-widgets.toml",  ["widget"]),
    ("70-plugins.toml",  ["plugins", "plugin_settings"]),
]
FALLBACK = "90-misc.toml"

# Matches [section], [[array.of.tables]] and indented [parent.child] alike;
# group(1) is the root name, which is all we need to pick a bucket.
HEADER = re.compile(r'^\s*\[\[?([A-Za-z0-9_]+)')


def main(src, dest):
    owner = {root: fname for fname, roots in GROUPS for root in roots}
    buckets = collections.OrderedDict((fname, []) for fname, _ in GROUPS)
    buckets[FALLBACK] = []

    with open(src) as fh:
        lines = fh.read().splitlines()

    current = None
    unknown = set()
    for line in lines:
        match = HEADER.match(line)
        if match:
            root = match.group(1)
            if root in owner:
                current = owner[root]
            else:
                current = FALLBACK
                unknown.add(root)
        if current is None:
            if line.strip():
                sys.exit(f"error: content before the first section: {line!r}")
            continue
        buckets[current].append(line)

    os.makedirs(dest, exist_ok=True)
    for fname, body in buckets.items():
        while body and not body[-1].strip():
            body.pop()
        path = os.path.join(dest, fname)
        if not body:
            # Nothing in this group: don't leave a stale empty file behind.
            if os.path.exists(path):
                os.remove(path)
            continue
        with open(path, "w") as fh:
            fh.write("\n".join(body) + "\n")

    if unknown:
        print(f"note: unrecognised section(s) {', '.join(sorted(unknown))} "
              f"-> {FALLBACK}; add them to GROUPS in {os.path.basename(__file__)}",
              file=sys.stderr)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__.strip())
    main(sys.argv[1], sys.argv[2])
