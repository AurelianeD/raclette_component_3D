<script lang="ts">
	import { handleRaclette } from '$lib/helpers/raclettes';
	// import { onMount } from 'svelte';
	// import { loadModel, placePlateModel, placeTableModel } from '$lib/helpers/functions';
	// import { createScene } from '$lib/three';
	// import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
	// import { Canvas } from '@threlte/core';
	import App from '$lib/components/App.svelte';

	let racletteNumber: number;
	// let racletteSlicePound = 30;
	// onMount(() => {
	// 	createScene(canvas);
	// 	loadModel('/assets/Plate.glb').then((model: GLTF) => {
	// 		placePlateModel(model);
	// 	});
	// 	loadModel('/assets/Table.glb').then((model: GLTF) => {
	// 		placeTableModel(model);
	// 	});
	// });
</script>

<div>
	<h1>Visualise ta commande de raclette</h1>
	<label
		>Combien de tranche veux-tu ?
		<input type="number" bind:value={racletteNumber} />
	</label>
	<button on:click={() => handleRaclette(racletteNumber)}>Ajouter les tranches</button>
	<!--	<p>{`Poids de ta commande : ${racletteSlicePound * racletteSlice}g`}</p>-->
	<App />
</div>

<style>
	:global(body) {
		margin: 0;
	}

	div {
		width: 100vw;
		height: 100vh;
		background: rgb(13, 19, 32);
		background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
		color: white;
	}
</style>
