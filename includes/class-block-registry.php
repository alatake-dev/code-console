<?php
namespace Triskelion\CodeConsole;

class Block_Registry {

	public static function init() {
		add_action( 'init', [ __CLASS__, 'register_blocks' ] );
	}

	static function  register_blocks() {
		register_block_type( TSK_CC_PATH . 'build/code-console' );
	}

}
