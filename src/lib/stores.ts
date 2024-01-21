import { writable, get } from 'svelte/store';
import * as THREE from 'three';
import CANNON from 'cannon';

export const sceneStore = writable(new THREE.Scene());
export const worldStore = writable(new CANNON.World());
export const cameraStore = writable(
	new THREE.PerspectiveCamera(
		45,
		typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 0,
		1,
		1000
	)
);
export const lightStore = writable(new THREE.AmbientLight(0xffffff, 2.4));
export const defaultMaterialStore = writable(new CANNON.Material('default'));
export const defaultContactMaterialStore = writable(
	new CANNON.ContactMaterial(get(defaultMaterialStore), get(defaultMaterialStore), {
		friction: 1,
		restitution: 0
	})
);
