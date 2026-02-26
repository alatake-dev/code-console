<?php
/**
 * PHP Render Callback para Code Console.
 * Este archivo genera el HTML final en el frontend.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// 1. Atributos nativos de Gutenberg (Clases de alineación, colores, etc.)
// Añadimos nuestra clase base 'tk-console-wrapper'
$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'tk-console-wrapper',
) );

// 2. Extraer datos del bloque y del entorno
$tabs       = isset( $attributes['tabs'] ) ? $attributes['tabs'] : array();
$block_alias = isset( $attributes['anchor'] ) ? $attributes['anchor'] : 'sin-alias';
$post_title  = get_the_title();
$category    = 'Documentación Técnica'; // Podría ser un atributo después si lo deseas

// Si no hay pestañas, no renderizamos nada (o un mensaje de ayuda)
if ( empty( $tabs ) ) {
	return;
}
?>

<div <?php echo $wrapper_attributes; ?>>
	<div class="tk-console-header">
		<div class="tk-console-dots">
			<span class="tk-dot red"></span>
			<span class="tk-dot yellow"></span>
			<span class="tk-dot green"></span>
		</div>

		<div class="tk-console-tabs-nav" role="tablist">
			<?php foreach ( $tabs as $index => $tab ) :
				$pos = $index + 1; // Posición humana (1, 2, 3...)
				?>
				<button
					class="tk-tab-item <?php echo 0 === $index ? 'is-active' : ''; ?>"
					role="tab"
					aria-selected="<?php echo 0 === $index ? 'true' : 'false'; ?>"
					data-index="<?php echo esc_attr( $index ); ?>"

				/* CAPA DE DATOS PARA GTM */
				data-gtm-event="terminal_interaction"
				data-gtm-category="<?php echo esc_attr( $category ); ?>"
				data-gtm-post-title="<?php echo esc_attr( $post_title ); ?>"
				data-gtm-block-alias="<?php echo esc_attr( $block_alias ); ?>"
				data-gtm-tab-label="<?php echo esc_attr( $tab['title'] ); ?>"
				data-gtm-lang="<?php echo esc_attr( $tab['language'] ); ?>"
				data-gtm-tab-position="<?php echo esc_attr( $pos ); ?>"
				>
				<?php echo esc_html( $tab['title'] ?: 'file.txt' ); ?>
				</button>
			<?php endforeach; ?>
		</div>
	</div>

	<div class="tk-console-body">
		<?php foreach ( $tabs as $index => $tab ) : ?>
			<div
				class="tk-tab-content <?php echo 0 === $index ? 'is-active' : ''; ?>"
				data-content-index="<?php echo esc_attr( $index ); ?>"
				style="<?php echo 0 !== $index ? 'display:none;' : ''; ?>"
			>
				<div class="tk-console-top-bar">
					<span class="tk-lang-badge"><?php echo esc_html( strtoupper( $tab['language'] ) ); ?></span>
					<button
						class="tk-copy-btn"
						data-gtm-event="code_copy"
						data-gtm-block-alias="<?php echo esc_attr( $block_alias ); ?>"
					>
						<?php esc_html_e( 'Copy', 'code-console' ); ?>
					</button>
				</div>
				<pre><code class="language-<?php echo esc_attr( $tab['language'] ); ?>"><?php echo esc_html( $tab['content'] ); ?></code></pre>
			</div>
		<?php endforeach; ?>
	</div>
</div>
