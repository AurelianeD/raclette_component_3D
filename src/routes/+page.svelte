<script lang="ts">
	import { createScene, handleRaclette } from '$lib/three';
	import { onMount } from 'svelte';

	let canvas;
	let racletteSlice: number;

	onMount(() => {
		createScene(canvas);
	});
</script>

<h1>Visualise ta quantité de raclette</h1>
<label
	>Combien de tranches de raclette veut-tu ?
	<input type="number" bind:value={racletteSlice} />
</label>
<button on:click={() => handleRaclette(racletteSlice)}>Ajouter les tranches</button>
<canvas id="three" bind:this={canvas}></canvas>
