<script lang="ts">
	import { createScene, handleRaclette } from '$lib/three';
	import { onMount } from 'svelte';

	let canvas;
	let racletteSlice = 0;
	let racletteSlicePound = 30;
	onMount(() => {
		createScene(canvas);
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
