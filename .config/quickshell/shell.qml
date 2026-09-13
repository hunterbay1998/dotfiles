import Quickshell
import Quickshell.Io

ShellRoot {
    Launcher {
        id: launcher
    }

    // Driven from niri: `qs ipc call launcher toggle`.
    // Types must be annotated explicitly or the function isn't registered.
    IpcHandler {
        target: "launcher"

        function toggle(): void { launcher.toggle(); }
        function reveal(): void { launcher.show(); }
        function hide(): void { launcher.hide(); }

        // Jump straight into a tree: "apps" or "weblinks".
        function open(tree: string): void {
            launcher.show();
            launcher.enter(tree);
        }
    }
}
