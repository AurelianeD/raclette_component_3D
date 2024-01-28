<script>
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
</script>

{#await useGltf('/assets/Plate.glb') then gltf}
	<T is={gltf.scene} scale={0.005} position={[0, 0.35, 0]} />
{/await}

{#await useGltf('/assets/Table.glb') then gltf}
	<T is={gltf.scene} scale={0.05} />
{/await}
