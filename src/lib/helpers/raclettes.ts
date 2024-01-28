import { currentRacletteNumberStore } from '$lib/stores';

export const racletteDimension = {
	x: 0.4,
	y: 0.03,
	z: 0.7
};

export function handleRaclette(numberOfRaclette: number) {
	currentRacletteNumberStore.set(numberOfRaclette);
}
