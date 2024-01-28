<script lang="ts">
	import { T, extend } from '@threlte/core';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { currentRacletteNumberStore } from '$lib/stores.ts';
	import { interactivity } from '@threlte/extras';
	import Lights from '$lib/components/Lights.svelte';
	import Camera from '$lib/components/Camera.svelte';
	import Models from '$lib/components/Models.svelte';
	import RacletteMesh from '$lib/components/RacletteMesh.svelte';

	const { target } = interactivity();
	target.set(document.getElementById('int-target') ?? undefined);

	extend({ OrbitControls });

	let array: number[];

	const unsubscribe = currentRacletteNumberStore.subscribe(
		(racletteNumber) => (array = new Array(racletteNumber))
	);
</script>

<Camera />
<Lights />

<Models />

{#each array as _, index}
	<RacletteMesh {index} />
{/each}
