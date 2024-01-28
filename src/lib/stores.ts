import { writable } from 'svelte/store';
// import type { Writable } from 'svelte/store';
// import CANNON from 'cannon';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { Mesh } from 'three';

// export const raclettesStore: Writable<{ mesh: Mesh; body: CANNON.Body }[]> = writable([]);
// export const gltfLoaderStore = writable(new GLTFLoader());
// export const tableMeshStore = writable(new Mesh());
// export const plateMeshStore = writable(new Mesh());
export const currentRacletteNumberStore = writable(0);
