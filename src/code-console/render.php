<?php
/**
 * Renderizado del bloque Code Console Pro
 * Versión: Simplificada (Single Terminal View)
 */

$tabs = isset($attributes['tabs']) ? $attributes['tabs'] : [];

if (empty($tabs)) {
	return '<div class="tk-console-placeholder">Agrega al menos una pestaña de código en el editor.</div>';
}
?>
<div class="tk-console-wrapper wp-block-triskelion-code-console">
	<div class="tk-console-header">
		<div class="tk-console-dots">
			<span class="tk-dot red"></span><span class="tk-dot yellow"></span><span class="tk-dot green"></span>
		</div>
		<div class="tk-console-tabs-nav">
			<?php foreach ($tabs as $index => $tab) : ?>
				<button class="tk-tab-item <?php echo $index === 0 ? 'is-active' : ''; ?>" data-index="<?php echo $index; ?>">
					<?php echo esc_html($tab['title'] ?: 'untitled'); ?>
				</button>
			<?php endforeach; ?>
		</div>
		<div class="tk-console-actions">
			<span class="tk-lang-badge" id="tk-current-lang"><?php echo esc_html(strtoupper($tabs[0]['language'])); ?></span>
			<button class="tk-copy-btn" aria-label="Copy code">
				<svg class="tk-copy-icon" viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
				<svg class="tk-check-icon" viewBox="0 0 24 24" width="16" height="16" style="display:none;"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
			</button>
		</div>
	</div>
	<div class="tk-console-body">
		<?php foreach ($tabs as $index => $tab) : ?>
			<div class="tk-tab-content <?php echo $index === 0 ? 'is-active' : ''; ?>" data-content-index="<?php echo $index; ?>" <?php echo $index !== 0 ? 'style="display:none;"' : ''; ?>>
				<div class="tk-code-container">
					<pre class="language-<?php echo esc_attr($tab['language']); ?>"><code class="language-<?php echo esc_attr($tab['language']); ?>"><?php echo esc_html($tab['content']); ?></code></pre>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>
