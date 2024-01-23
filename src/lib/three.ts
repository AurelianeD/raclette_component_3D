import * as THREE from 'three';
import { get } from 'svelte/store';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { plateBody, racletteMaterial, racletteGeometry, racletteShape } from '$lib/object';
import {
	sceneStore,
	worldStore,
	cameraStore,
	lightStore,
	defaultMaterialStore,
	defaultContactMaterialStore,
	raclettesStore
} from '$lib/stores';
import { resize } from '$lib/helpers/functions';

let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
const raclettes = get(raclettesStore);

// init scene

const scene = get(sceneStore);
const world = get(worldStore);
world.gravity.set(0, -9.82, 0);

const camera = get(cameraStore);
camera.position.z = 10;
camera.rotation.z = Math.PI * 0.5;

// light
const light = get(lightStore);
scene.add(light);

//Materials
const defaultContactMaterial = get(defaultContactMaterialStore);
world.defaultContactMaterial = defaultContactMaterial;

// scene.add(plate);
world.addBody(plateBody);

const clock = new THREE.Clock();
let oldElapsedTime = 0;

function animate() {
	const elapsedTime = clock.getElapsedTime();
	const deltaTime = elapsedTime - oldElapsedTime;
	oldElapsedTime = elapsedTime;

	world.step(1 / 60, deltaTime, 3);
	for (const raclette of raclettes) {
		raclette.mesh.position.copy(raclette.body.position);
	}
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

export const createScene = (canvas: HTMLCanvasElement) => {
	renderer = new THREE.WebGLRenderer({ canvas: canvas });
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	resize(renderer);
	animate();
};

//TODO: make addEventListener function to resize the scene acording to the window
