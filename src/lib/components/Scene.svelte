<script lang="ts">
	import { T, extend } from '@threlte/core';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { interactivity } from '@threlte/extras';
	import Camera from '$lib/components/Camera.svelte';
	import { currentRacletteNumberStore } from '$lib/stores.ts';

	const { target } = interactivity();
	target.set(document.getElementById('int-target') ?? undefined);

	extend({ OrbitControls });

	const racletteDimension = {
		x: 0.4,
		y: 0.03,
		z: 0.7
	};

	let array: number[];

	const unsubscribe = currentRacletteNumberStore.subscribe(
		(racletteNumber) => (array = new Array(racletteNumber))
	);
</script>

<Camera />

<T.AmbientLight intensity={0.4} />
<T.DirectionalLight position={[0, 10, 10]} />

{#each array as _, index}
	<T.Mesh position.y={index}>
		<T.BoxGeometry args={[racletteDimension.x, racletteDimension.y, racletteDimension.z]} />
		<T.MeshStandardMaterial color="beige" />
	</T.Mesh>
{/each}
