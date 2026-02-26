<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$tabs = isset( $attributes['tabs'] ) ? $attributes['tabs'] : array();
$block_alias = isset( $attributes['anchor'] ) ? $attributes['anchor'] : 'console';

if ( empty( $tabs ) ) return;

$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'tk-console-wrapper',
) );
?>

<div <?php echo $wrapper_attributes; ?>>
	<div class="tk-console-header">
		<div class="tk-console-dots">
			<span class="tk-dot red"></span>
			<span class="tk-dot yellow"></span>
			<span class="tk-dot green"></span>
		</div>
		<div class="tk-console-tabs-nav" role="tablist">
			<?php foreach ( $tabs as $index => $tab ) : ?>
				<button
					class="tk-tab-item <?php echo 0 === $index ? 'is-active' : ''; ?>"
					role="tab"
					data-index="<?php echo $index; ?>"
					data-alias="<?php echo esc_attr( $block_alias ); ?>"
				>
					<?php echo esc_html( ! empty( $tab['title'] ) ? $tab['title'] : 'archivo.txt' ); ?>
				</button>
			<?php endforeach; ?>
		</div>
	</div>

	<div class="tk-console-body">
		<?php foreach ( $tabs as $index => $tab ) : ?>
			<div
				class="tk-tab-content <?php echo 0 === $index ? 'is-active' : ''; ?>"
				data-content-index="<?php echo $index; ?>"
				style="<?php echo 0 !== $index ? 'display:none;' : ''; ?>"
			>
				<div class="tk-console-info">
					<span class="tk-lang-badge"><?php echo esc_html( strtoupper( $tab['language'] ) ); ?></span>
				</div>
				<?php /* IMPORTANTE: No puede haber espacios entre <code> y el PHP */ ?>
				<pre><code class="language-<?php echo esc_attr( $tab['language'] ); ?>"><?php echo esc_html( $tab['content'] ); ?></code></pre>
			</div>
		<?php endforeach; ?>
	</div>
</div>
