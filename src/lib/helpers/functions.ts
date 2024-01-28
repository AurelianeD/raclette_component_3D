// import { get } from 'svelte/store';
// import { gltfLoaderStore, tableMeshStore, sceneStore, plateMeshStore } from '$lib/stores';
// import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { WebGLRenderer } from 'three';
//
// const tableMesh = get(tableMeshStore);
// const plateMesh = get(plateMeshStore);
// const scene = get(sceneStore);
//
// export function resize(renderer: WebGLRenderer) {
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// }
//
// export function loadModel(url: string) {
// 	const gltfLoader = get(gltfLoaderStore);
// 	return gltfLoader.loadAsync(url);
// }
//
// export function placeTableModel(model: GLTF) {
// 	const meshModel = model.scene.children[0];
// 	tableMesh.add(meshModel);
// 	scene.add(tableMesh);
// }
//
// export function placePlateModel(model: GLTF) {
// 	const meshModel = model.scene.children[0];
// 	plateMesh.add(meshModel);
// 	scene.add(plateMesh);
// }
