<script>
	import { T, extend } from '@threlte/core';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { interactivity } from '@threlte/extras';
	import Camera from '$lib/components/Camera.svelte';

	const { target } = interactivity();

	target.set(document.getElementById('int-target') ?? undefined);

	extend({ OrbitControls });

	const racletteDimension = {
		x: 0.4,
		y: 0.03,
		z: 0.7
	};
</script>

<Camera />

<T.AmbientLight intensity={0.4} />
<T.DirectionalLight position={[0, 10, 10]} />

<T.Mesh position.y={1}>
	<T.BoxGeometry args={[racletteDimension.x, racletteDimension.y, racletteDimension.z]} />
	<T.MeshStandardMaterial color="beige" />
</T.Mesh>
