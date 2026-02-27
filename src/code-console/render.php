<?php
/**
 * Renderizado del bloque Code Console Pro
 * Mantenemos la estructura de nodos idéntica a la versión funcional de 'develop'.
 */
$tabs = isset($attributes['tabs']) ? $attributes['tabs'] : [];

if (empty($tabs)) {
	return '<div class="tk-console-placeholder">Agrega al menos una pestaña de código en el editor.</div>';
}
?>

<div class="tk-console-wrapper wp-block-triskelion-code-console">
	<div class="tk-console-header">
		<div class="tk-console-dots">
			<span class="tk-dot red"></span>
			<span class="tk-dot yellow"></span>
			<span class="tk-dot green"></span>
		</div>
		<div class="tk-console-tabs-nav" role="tablist">
			<?php foreach ($tabs as $index => $tab) : ?>
				<button class="tk-tab-item <?php echo $index === 0 ? 'is-active' : ''; ?>"
						role="tab"
						data-index="<?php echo $index; ?>"
						data-alias="console">
					<?php echo esc_html($tab['fileName'] ?: 'untitled'); ?>
				</button>
			<?php endforeach; ?>
		</div>
	</div>

	<div class="tk-console-body">
		<?php foreach ($tabs as $index => $tab) : ?>
			<div class="tk-tab-content <?php echo $index === 0 ? 'is-active' : ''; ?>"
				 data-content-index="<?php echo $index; ?>"
				<?php echo $index !== 0 ? 'style="display:none;"' : ''; ?>>

				<?php // Cirugía: Se elimina el div .tk-console-info para ganar espacio vertical ?>

				<div class="tk-wrapper">
					<div class="tk-nav">
						<div class="tk-dots"></div>
						<div class="tk-tab-list" style="display: none;"></div>
					</div>
					<div class="tk-outer-container">
						<div class="tk-content active" style="display: block;">
                            <pre class="language-<?php echo esc_attr($tab['language']); ?>" tabindex="0" data-terminal-init="true">
                                <code class="language-<?php echo esc_attr($tab['language']); ?>">
                                    <?php echo esc_html($tab['content']); ?>
                                </code>
                                <span class="tk-badge">CODE</span>
                                <button class="tk-copy">Copy</button>
                            </pre>
						</div>
					</div>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>
