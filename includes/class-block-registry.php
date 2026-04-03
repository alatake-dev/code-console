<?php
namespace Triskelion\CodeConsole;

class Block_Registry {

	public static function init() {
		self::block_init();
		// Something....
	}

	static function  block_init() {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		add_action( 'init', 'triskelion_code_console_block_init' );
	}

}
