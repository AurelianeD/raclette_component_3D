import * as THREE from 'three';
import CANNON from 'cannon';

export const plate = new THREE.Mesh(
	new THREE.BoxGeometry(2, 0.5, 2),
	new THREE.MeshBasicMaterial({ color: 'white' })
);

const plateShape = new CANNON.Box(new CANNON.Vec3(1, 0.1 * 0.5, 1));
export const plateBody = new CANNON.Body();
plateBody.addShape(plateShape);

const racletteDimension = {
	width: 0.4,
	height: 0.03,
	depth: 0.7
};

export const racletteGeometry = new THREE.BoxGeometry(
	racletteDimension.width,
	racletteDimension.height,
	racletteDimension.depth
);
export const racletteMaterial = new THREE.MeshBasicMaterial({ color: '#feecb9' });

export const racletteShape = new CANNON.Box(
	new CANNON.Vec3(racletteDimension.width, racletteDimension.height, racletteDimension.depth)
);
