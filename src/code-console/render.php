<?php
/**
 * PHP Render Callback para Code Console.
 * Asegura el estándar de WordPress y el aislamiento de estilos.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Extraemos atributos con valores por defecto
$tabs       = isset( $attributes['tabs'] ) ? $attributes['tabs'] : array();
$block_id   = 'tk-console-' . substr( md5( wp_json_encode( $attributes ) ), 0, 8 );
$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'tk-console-wrapper' ) );

if ( empty( $tabs ) ) {
	return '<p>' . esc_html__( 'Añade una pestaña de código...', 'code-console' ) . '</p>';
}
?>

<div <?php echo $wrapper_attributes; ?> id="<?php echo esc_attr( $block_id ); ?>">
	<div class="tk-console-nav">
		<div class="tk-console-dots">
			<span class="tk-dot red"></span>
			<span class="tk-dot yellow"></span>
			<span class="tk-dot green"></span>
		</div>
		<div class="tk-console-tab-list" role="tablist">
			<?php foreach ( $tabs as $index => $tab ) : ?>
				<button
					class="tk-console-tab <?php echo 0 === $index ? 'is-active' : ''; ?>"
					role="tab"
					data-tab-index="<?php echo esc_attr( $index ); ?>"
					aria-selected="<?php echo 0 === $index ? 'true' : 'false'; ?>"
				>
					<?php echo esc_html( esc_html($tab['title'] )?: 'file.txt' ); ?>
				</button>
			<?php endforeach; ?>
		</div>
	</div>

	<div class="tk-console-body">
		<?php foreach ( $tabs as $index => $tab ) : ?>
			<div
				class="tk-console-content <?php echo 0 === $index ? 'is-active' : ''; ?>"
				data-content-index="<?php echo esc_attr( $index ); ?>"
				style="<?php echo 0 !== $index ? 'display:none;' : ''; ?>"
			>
				<div class="tk-console-top-bar">
					<span class="tk-console-lang"><?php echo esc_html( strtoupper( $tab['language'] ) ); ?></span>
					<button class="tk-console-copy" data-copy-target="code-<?php echo esc_attr( $block_id . '-' . $index ); ?>">
						<?php esc_html_e( 'Copy', 'code-console' ); ?>
					</button>
				</div>
				<div class="tk-console-scroll-container">
					<pre class="language-<?php echo esc_attr( $tab['language'] ); ?>"><code id="code-<?php echo esc_attr( $block_id . '-' . $index ); ?>"><?php echo esc_html( $tab['content'] ); ?></code></pre>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>
