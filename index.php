<?php
/**
 * Plugin Name: Gutenberg Workshop
 * Description: Gutenberg Plugin build for the Gutenberg Workshop at WordCamp Prague.
 * Author: Anja Deubzer & Fabian Kägy
 * Author URI: https://github.com/fabiankaegy/gutenberg-workshop-wordcamp-prague
 * Version: 1.0.0
 *
 * @package gutenberg-workshop
 */

namespace wordcampprague\gutenberg_workshop;

// exit if accessed directly
defined( 'ABSPATH' ) || exit;

add_action( 'init', __NAMESPACE__ . '\register_block_assets' );

/**
 * registering and enqueueing all js files for the gutenberg editor
 */
function register_block_assets() {

	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";

	$script_asset = include $script_asset_path;

	// wp_register_script($handle, $src, $deps, $version, $in_footer);
	wp_register_script(
		'card-block-javascript',
		plugins_url( '/build/index.js', __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version'],
		false
	);

	$style_path = '/style.css';
	wp_register_style(
		'card-block-styles',
		plugins_url( $style_path, __FILE__ ),
		[],
		$script_asset['version']
	);

	$editor_style_path = '/editor.css';
	wp_register_style(
		'card-block-editor-styles',
		plugins_url( $editor_style_path, __FILE__ ),
		[],
		$script_asset['version']
	);

	// register_block_type( $blockname, $options );
	register_block_type(
		'wordcampprague/cardblock',
		[
			'editor_style'  => 'card-block-editor-styles',
			'style'         => 'card-block-styles',
			'editor_script' => 'card-block-javascript',
		]
	);

	register_block_style(
		'wordcampprague/cardblock',
		array(
			'name'         => 'blue-quote',
			'label'        => __( 'Blue Quote' ),
		)
	);

};


