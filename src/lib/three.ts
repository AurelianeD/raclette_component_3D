import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CANNON from 'cannon';
import { plate, plateBody, racletteMaterial, racletteGeometry, racletteShape } from '$lib/object';

let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let currentRacletteNumber = 0;
const raclettes: { mesh: THREE.Mesh; body: CANNON.Body }[] = [];

// init scene

const scene = new THREE.Scene();
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

const camera = new THREE.PerspectiveCamera(
	45,
	typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 0,
	1,
	1000
);
camera.position.z = 5;

function resize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
}

// Models
const gltLoader = new GLTFLoader();
// table
gltLoader.load('/Table/Table.glb', (table) => {
	const tableModel = table.scene.children[0];
	tableModel.position.set(0, -2, 0);
	tableModel.scale.set(0.25, 0.25, 0.25);
	const tableMaterial = new THREE.MeshStandardMaterial({ color: '#5c2d07' });
	scene.add(tableModel);

	tableModel.traverse((object) => {
		object.material = tableMaterial;
		object.material.needsUpdate = true;
	});
});

// plate
gltLoader.load('/plate/Plate.glb', (plate) => {
	const plateModel = plate.scene.children[0];
	plateModel.scale.set(0.025, 0.025, 0.025);
	console.log('PLATE POSITION', plateModel.position);
	scene.add(plateModel);
});

// light
const light = new THREE.AmbientLight(0xffffff, 2.4);
scene.add(light);

//Materials
const defaultMaterial = new CANNON.Material('default');
const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
	friction: 1,
	restitution: 0.1
});
world.defaultContactMaterial = defaultContactMaterial;

// scene.add(plate);
world.addBody(plateBody);
console.log('PLATE BODY', plateBody.position);

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
	}, 1000);
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
	controls = new OrbitControls(camera, renderer.domElement);
	resize();
	animate();
};

//TODO: make addEventListener function to resize the scene acording to the window
