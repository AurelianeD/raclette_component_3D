import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;

// init scene

const scene = new THREE.Scene();
const world = new CANNON.World({
	gravity: new CANNON.Vec3(0, -9.82, 0)
});

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

function animate() {
	requestAnimationFrame(animate);

	controls.update();
	renderer.render(scene, camera);
}

//Materials
const defaultMaterial = new CANNON.Material('default');
const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
	friction: 0.1,
	restitution: 0.7
});
world.defaultContactMaterial = defaultContactMaterial;

export const createScene = (canvas: HTMLCanvasElement) => {
	renderer = new THREE.WebGLRenderer({ canvas });
	controls = new OrbitControls(camera, renderer.domElement);
	resize();
	animate();
};

const plate = new THREE.Mesh(
	new THREE.BoxGeometry(2, 0.5, 2),
	new THREE.MeshBasicMaterial({ color: 'white' })
);
scene.add(plate);

const plateShape = new CANNON.Box(new CANNON.Vec3(2, 0.5, 2));
const plateBody = new CANNON.Body();
plateBody.mass = 0;
plateBody.addShape(plateShape);
world.addBody(plateBody);

const raclettes = [];

export function addRaclette() {
	const racletteDimention = {
		width: 0.4,
		height: 0.03,
		depth: 0.7
	};
	const raclette = new THREE.Mesh(
		new THREE.BoxGeometry(
			racletteDimention.width,
			racletteDimention.height,
			racletteDimention.depth
		),
		new THREE.MeshBasicMaterial({ color: 'red' })
	);
	raclette.position.set(0, 1, 0);
	scene.add(raclette);
	//TODO: shape and body with CANNON
}

//TODO: make addEventListener function to resize the scene acording to the window
