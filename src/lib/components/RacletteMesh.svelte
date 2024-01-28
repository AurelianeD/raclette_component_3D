<script lang="ts">
	import { T } from '@threlte/core';
	import { racletteDimension } from '$lib/helpers/raclettes';

	export let index: number;
</script>

<T.Mesh position.y={index}>
	<T.BoxGeometry args={[racletteDimension.x, racletteDimension.y, racletteDimension.z]} />
	<T.MeshStandardMaterial color="beige" />
</T.Mesh>
