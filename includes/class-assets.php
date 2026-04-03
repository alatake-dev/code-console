<?php
namespace Triskelion\CodeConsole;
class assets {
	public static function init() {
		add_action('wp_enqueue_scripts', [__CLASS__, 'enqueue_assets']);
	}

	public static function enqueue_assets() {
		global $post;

		// Detección agnóstica basada en contenido
		$should_load = false;
		if ( is_a( $post, 'WP_Post' ) ) {
			if ( has_block('triskelion/code-console', $post) || strpos($post->post_content, 'class="language-') !== false ) {
				$should_load = true;
			}
		}

		if ( apply_filters('tsk_cc_force_load', $should_load) ) {
			// Usamos la constante TSK_CC_URL para que siempre apunte al plugin
			wp_enqueue_script('tsk-cc-prism', TSK_CC_URL . 'assets/prism/prism.min.js', [], '1.29.0', true);
			wp_enqueue_script('tsk-cc-autoloader', TSK_CC_URL . 'assets/prism/plugins/autoloader/prism-autoloader.min.js', ['tsk-cc-prism'], '1.29.0', true);

			$inline_config = "
                (function() {
                    if (window.Prism && Prism.plugins.autoloader) {
                        Prism.plugins.autoloader.languages_path = '" . TSK_CC_URL . "assets/prism/components/';
                    }
                })();
            ";
			wp_add_inline_script('tsk-cc-autoloader', $inline_config);
		}
	}
}
Assets::init();
