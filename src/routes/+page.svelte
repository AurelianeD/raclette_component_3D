<script lang="ts">
	import { createScene, addRaclette, removeRaclette, handleRaclette } from '$lib/three';
	import { onMount } from 'svelte';

	let canvas;
	let racletteSlice: number;

	onMount(() => {
		createScene(canvas);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<label
	>Combien de tranches de raclette veut-tu ?
	<input type="number" bind:value={racletteSlice} />
</label>
<button on:click={() => handleRaclette(racletteSlice)}>Ajouter les tranches</button>
<button on:click={() => removeRaclette()}>remove raclette</button>
<canvas id="three" bind:this={canvas}></canvas>
