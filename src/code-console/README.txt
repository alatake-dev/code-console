=== Code Console Pro ===
Contributors: alatake
Tags: code, console, tabs, developer, gutenberg, prismjs, terminal
Requires at least: 6.0
Tested up to: 6.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A professional Gutenberg block to display code snippets in a macOS-style terminal with multiple tabs and native Prism.js support.

== Description ==

Code Console Pro is a developer-focused block designed to showcase code tutorials and documentation beautifully. It groups multiple files into a single terminal interface, saving space and improving readability.

**Features:**
* **Tabbed Interface:** Perfect for showing related files (e.g., HTML, CSS, JS) in one place.
* **Smart Mobile Layout:** Uses CSS Grid "min-width: 0" logic to prevent horizontal layout breaks.
* **Internal Scrolling:** Independent horizontal scroll for code content and tab navigation.
* **Native Code Pasting:** Built with PlainText to preserve indentation and clean formatting.
* **MacOS Aesthetic:** Window controls and dark-mode by default.

== Installation ==

1. Upload the `code-console` folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Add the "Code Console" block from the block inserter.

== Frequently Asked Questions ==

= Which languages are supported? =
The block comes pre-configured with the most common languages: JavaScript, PHP, CSS, HTML (Markup), Bash, Python, SQL, and JSON. It is designed to work seamlessly with Prism.js.

= Does it break my site's layout on mobile? =
No. We have implemented a specific overflow-x fix that keeps the terminal within the container while allowing internal scrolling for the code.

== Screenshots ==
1. Multi-tab terminal showing the macOS-style header.
2. The block inspector with tab reordering and language selection.

== Changelog ==

= 1.0.0 =
* Initial stable release.
* Added multi-tab support with drag-and-drop reordering.
* Fixed horizontal scroll issues on mobile devices.
* Standardized language selection for developer workflows.
