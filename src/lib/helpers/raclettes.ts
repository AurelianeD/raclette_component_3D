import { currentRacletteNumberStore } from '$lib/stores';

export function handleRaclette(numberOfRaclette: number) {
	currentRacletteNumberStore.set(numberOfRaclette);
}
