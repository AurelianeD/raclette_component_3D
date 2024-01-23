<script lang="ts">
	import { handleRaclette } from '$lib/helpers/raclettes';
	import { onMount } from 'svelte';
	import { loadModel, placePlateModel, placeTableModel } from '$lib/helpers/functions';
	import { createScene } from '$lib/three';
	import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

	let canvas;
	let racletteSlice = 0;
	let racletteSlicePound = 30;
	onMount(() => {
		createScene(canvas);
		loadModel('/assets/Plate.glb').then((model: GLTF) => {
			placePlateModel(model);
		});
		loadModel('/assets/Table.glb').then((model: GLTF) => {
			placeTableModel(model);
		});
	});
</script>

<h1>Visualise ta commande de raclette</h1>
<label
	>Combien de tranche veux-tu ?
	<input type="number" bind:value={racletteSlice} />
</label>
<button on:click={() => handleRaclette(racletteSlice)}>Ajouter les tranches</button>
<p>{`Poids de ta commande : ${racletteSlicePound * racletteSlice}g`}</p>
<canvas id="three" bind:this={canvas}></canvas>
