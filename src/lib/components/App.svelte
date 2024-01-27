<script>
	import { Canvas, extend } from '@threlte/core';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	import Scene from '$lib/components/Scene.svelte';

	extend({
		OrbitControls
	});
</script>

<div id="int-target" class="container">
	<Canvas>
		<Scene />
	</Canvas>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
	}
</style>
