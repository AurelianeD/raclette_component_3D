import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import CANNON from 'cannon';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AmbientLight, PerspectiveCamera, Scene, Mesh } from 'three';

export const sceneStore = writable(new Scene());
export const worldStore = writable(new CANNON.World());
export const cameraStore = writable(
	new PerspectiveCamera(
		45,
		typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 0,
		1,
		1000
	)
);
export const lightStore = writable(new AmbientLight(0xffffff, 2.4));
export const defaultMaterialStore = writable(new CANNON.Material('default'));
export const defaultContactMaterialStore = writable(
	new CANNON.ContactMaterial(get(defaultMaterialStore), get(defaultMaterialStore), {
		friction: 1,
		restitution: 0
	})
);

export const raclettesStore: Writable<{ mesh: Mesh; body: CANNON.Body }[]> = writable([]);
export const gltfLoaderStore = writable(new GLTFLoader());
export const tableMeshStore = writable(new Mesh());
export const plateMeshStore = writable(new Mesh());
export const currentRacletteNumberStore = writable(0);
