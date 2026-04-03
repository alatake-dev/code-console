<?php
/**
 * Plugin Name:       Code Console
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           1.1.1
 * Requires at least: 6.8
 * Requires PHP:      8.1
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       code-console
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

require_once plugin_dir_path( __FILE__ ) . 'includes/class-assets.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/class-block-registry.php';

/**
 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
 * based on the registered block metadata. Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */


spl_autoload_register(function ($class) {
	$prefix = 'Triskelion\\CodeConsole\\';
	$base_dir = __DIR__ . '/includes/';

	$len = strlen($prefix);
	if (strncmp($prefix, $class, $len) !== 0) return;

	$relative_class = substr($class, $len);
	$file = $base_dir . 'class-' . str_replace('\\', '/', strtolower($relative_class)) . '.php';

	if (file_exists($file)) {
		require $file;
	}
});

\Triskelion\CodeConsole\Assets::init();
\Triskelion\CodeConsole\Block_Registry::init();
