import CANNON from 'cannon';
import { racletteGeometry, racletteMaterial, racletteShape } from '$lib/object';
import * as THREE from 'three';
import {
	currentRacletteNumberStore,
	defaultMaterialStore,
	raclettesStore,
	sceneStore,
	worldStore
} from '$lib/stores';
import { get } from 'svelte/store';

const currentRacletteNumber = get(currentRacletteNumberStore);
const defaultMaterial = get(defaultMaterialStore);
const scene = get(sceneStore);
const world = get(worldStore);
const raclettes = get(raclettesStore);

export function addRaclette(numberOfRaclette: number) {
	currentRacletteNumberStore.update((currentRacletteNumber) => currentRacletteNumber + 1);
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
		currentRacletteNumberStore.update((currentRacletteNumber) => currentRacletteNumber - 1);
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
