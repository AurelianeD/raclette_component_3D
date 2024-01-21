import * as THREE from 'three';

export function resize(renderer: THREE.WebGLRenderer) {
	renderer.setSize(window.innerWidth, window.innerHeight);
}
