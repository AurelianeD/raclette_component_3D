import * as THREE from 'three';
import { get } from 'svelte/store';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CANNON from 'cannon';
import { plateBody, racletteMaterial, racletteGeometry, racletteShape } from '$lib/object';
import {
	sceneStore,
	worldStore,
	cameraStore,
	lightStore,
	defaultMaterialStore,
	defaultContactMaterialStore
} from '$lib/stores';
import { resize } from '$lib/functions';

let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let currentRacletteNumber = 0;
const raclettes: { mesh: THREE.Mesh; body: CANNON.Body }[] = [];

// init scene

const scene = get(sceneStore);
const world = get(worldStore);
world.gravity.set(0, -9.82, 0);

const camera = get(cameraStore);
camera.position.z = 10;
camera.rotation.z = Math.PI * 0.5;

// Models
// table
const gltLoader = new GLTFLoader();
// gltLoader.load('assets/Table.glb', (table) => {
// 	console.log('loaded', table);
// const tableModel = table.scene.children[0];
// tableModel.position.set(0, -2, 0);
// tableModel.scale.set(0.25, 0.25, 0.25);
// tableModel.rotation.set(0, Math.PI * 0.5, 0);
// const tableMaterial = new THREE.MeshStandardMaterial({ color: '#5c2d07' });
// scene.add(tableModel);
//
// tableModel.traverse((object) => {
// 	object.material = tableMaterial;
// 	object.material.needsUpdate = true;
// });
// });

// plate
// gltLoader.load('Plate.glb', (plate) => {
// 	const plateModel = plate.scene.children[0];
// 	plateModel.scale.set(0.025, 0.025, 0.025);
// 	scene.add(plateModel);
// });

// light
const light = get(lightStore);
scene.add(light);

//Materials
const defaultMaterial = get(defaultMaterialStore);
const defaultContactMaterial = get(defaultContactMaterialStore);
world.defaultContactMaterial = defaultContactMaterial;

// scene.add(plate);
world.addBody(plateBody);

export function addRaclette(numberOfRaclette: number) {
	currentRacletteNumber++;
	const racletteBody = new CANNON.Body({
		mass: 1,
		shape: racletteShape,
		material: defaultMaterial,
		position: new CANNON.Vec3(0, 3, 0)
	});

	const racletteMesh = new THREE.Mesh(racletteGeometry, racletteMaterial);

	scene.add(racletteMesh);
	world.addBody(racletteBody);
	raclettes.push({ mesh: racletteMesh, body: racletteBody });
	if (currentRacletteNumber === numberOfRaclette) {
		return;
	}
	setTimeout(() => {
		addRaclette(numberOfRaclette);
	}, 500);
}

export function removeRaclette(numberOfRaclette: number) {
	const racletteToRemove = currentRacletteNumber - numberOfRaclette;

	for (let i = 0; i < racletteToRemove; i++) {
		world.remove(raclettes[0].body);
		scene.remove(raclettes[0].mesh);
		raclettes.splice(0, 1);
		currentRacletteNumber--;
	}
}

export function handleRaclette(numberOfRaclette: number) {
	if (currentRacletteNumber < numberOfRaclette) {
		addRaclette(numberOfRaclette);
		return;
	}
	if (currentRacletteNumber > numberOfRaclette) {
		removeRaclette(numberOfRaclette);
		return;
	}
}

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

	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

export const createScene = (canvas: HTMLCanvasElement) => {
	renderer = new THREE.WebGLRenderer({ canvas });
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	resize(renderer);
	animate();
};

//TODO: make addEventListener function to resize the scene acording to the window
